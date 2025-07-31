require('dotenv').config({ path: __dirname + '/../../.env' });
const redisClient = require('../config/redis.config');

const processNotifications = async () => {
    console.log('[Worker] Waiting for jobs in notification-queue...');
    while (true) {
        try {
            const result = await redisClient.blpop('notification-queue', 0);
            const notification = JSON.parse(result[1]);
            console.log('--- [Worker] PROCESSING NOTIFICATION ---');
            console.log(`  Message: "${notification.message}"`);
            console.log('--------------------------------------');
        } catch (error) {
            console.error('[Worker] Error processing job:', error);
        }
    }
};

processNotifications();