// src/workers/notification.worker.js - FINAL VERSION

require('dotenv').config({ path: __dirname + '/../../.env' });
const { Op } = require('sequelize');
const cron = require('node-cron');
const redisClient = require('../config/redis.config');
const { CourseOffering, ActivityTracker, User } = require('../models');

// Helper function to get the current week number of the year
const getCurrentWeekNumber = () => {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

// --- JOB 1: The Scheduled Reminder Task ---
const checkForMissingLogs = async () => {
    console.log('[Cron Job] Running job to check for missing activity logs...');
    const currentWeek = getCurrentWeekNumber();
    
    try {
        // 1. Find all courses that are currently active
        const activeCourses = await CourseOffering.findAll({
            include: { model: User, as: 'facilitator' } // Include facilitator details
        });

        // 2. For each course, check if a log for this week exists
        for (const course of activeCourses) {
            const logExists = await ActivityTracker.findOne({
                where: {
                    allocationId: course.id,
                    weekNumber: currentWeek
                }
            });

            // 3. If no log exists, queue a reminder notification
            if (!logExists) {
                console.log(`[Cron Job] Missing log found for course ID ${course.id}. Queueing reminder.`);
                const reminder = {
                    type: 'REMINDER',
                    message: `Reminder: Please submit your activity log for '${course.moduleName}' for week ${currentWeek}.`,
                    facilitatorEmail: course.facilitator.email, // We can target the specific facilitator now
                    timestamp: new Date().toISOString()
                };
                // Push the reminder to the same queue
                await redisClient.lpush('notification-queue', JSON.stringify(reminder));
            }
        }
    } catch (error) {
        console.error('[Cron Job] Error checking for missing logs:', error);
    }
};

// --- JOB 2: The Immediate Notification Processor (Your existing code) ---
const processNotifications = async () => {
    console.log('[Worker] Waiting for jobs in the notification-queue...');
    
    while (true) {
        try {
            const result = await redisClient.blpop('notification-queue', 0);
            const notificationData = JSON.parse(result[1]);

            console.log('--- [Worker] PROCESSING NOTIFICATION ---');
            console.log(`  Type: ${notificationData.type || 'LOG_SUBMITTED'}`);
            console.log(`  Message: "${notificationData.message}"`);
            console.log('-----------------------------------------');

        } catch (error) {
            console.error('[Worker] Error processing job:', error.message);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
};

// --- START THE WORKER ---
redisClient.on('ready', () => {
    console.log('[Worker] Redis client is ready.');
    
    // Start the immediate notification listener
    processNotifications();
    
    // Schedule the cron job to run at 9:00 AM every Friday
    // You can change this schedule string as needed.
    // '0 9 * * 5' means: at minute 0, of hour 9, on any day of month, any month, on the 5th day of the week (Friday).
    cron.schedule('0 9 * * 5', checkForMissingLogs);
    console.log('[Cron Job] Scheduled reminder job to run every Friday at 9:00 AM.');
});

redisClient.on('error', (err) => {
    console.error('[Worker] Redis client could not connect:', err);
});