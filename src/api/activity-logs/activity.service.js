// src/api/activity-logs/activity.service.js - UPDATED

const { ActivityTracker, CourseOffering } = require('../../models');
const redisClient = require('../../config/redis.config');

const createOrUpdateLog = async (logData, userId) => {
    const allocation = await CourseOffering.findOne({
        where: { id: logData.allocationId, facilitatorId: userId }
    });
    if (!allocation) {
        const err = new Error('Forbidden: You are not authorized for this course.');
        err.statusCode = 403;
        throw err;
    }
    const [log, created] = await ActivityTracker.findOrCreate({
        where: { allocationId: logData.allocationId, weekNumber: logData.weekNumber },
        defaults: logData,
    });
    if (!created) {
        // If the log already existed, we update it instead of creating
        await log.update(logData);
    }

    const notification = {
        type: 'LOG_SUBMITTED',
        message: `Facilitator ID ${userId} submitted/updated a log for module '${allocation.moduleName}', week ${logData.weekNumber}.`,
        timestamp: new Date().toISOString(),
    };
    await redisClient.lpush('notification-queue', JSON.stringify(notification));
    return log;
};

// --- NEW FUNCTION TO UPDATE A LOG ---
const updateLog = async (logId, logData, userId) => {
    const log = await ActivityTracker.findByPk(logId, {
        include: { model: CourseOffering, as: 'allocation' }
    });
    // Security Check: Does the log exist and does this facilitator own it?
    if (!log || log.allocation.facilitatorId !== userId) {
        return null; // Not found or not authorized
    }
    return await log.update(logData);
};
// --- END OF NEW FUNCTION ---

// --- NEW FUNCTION TO DELETE A LOG ---
const removeLog = async (logId, userId) => {
    const log = await ActivityTracker.findByPk(logId, {
        include: { model: CourseOffering, as: 'allocation' }
    });
    // Security Check: Does the log exist and does this facilitator own it?
    if (!log || log.allocation.facilitatorId !== userId) {
        return null; // Not found or not authorized
    }
    await log.destroy();
    return true;
};
// --- END OF NEW FUNCTION ---

const findLogs = async (query) => {
    // ... this function remains the same ...
    const where = {};
    if (query.allocationId) where.allocationId = query.allocationId;
    if (query.week) where.weekNumber = query.week;
    return ActivityTracker.findAll({ where });
};

module.exports = {
    createOrUpdateLog,
    updateLog, // Export the new function
    removeLog, // Export the new function
    findLogs
};