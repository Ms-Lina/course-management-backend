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
    if (!created) await log.update(logData);

    const notification = {
        message: `Facilitator ID ${userId} updated log for module '${allocation.moduleName}', week ${logData.weekNumber}.`,
        timestamp: new Date().toISOString(),
    };
    await redisClient.lpush('notification-queue', JSON.stringify(notification));
    return log;
};

const findLogs = (query) => {
    const where = {};
    if (query.allocationId) where.allocationId = query.allocationId;
    if (query.week) where.weekNumber = query.week;
    return ActivityTracker.findAll({ where });
};

module.exports = { createOrUpdateLog, findLogs };