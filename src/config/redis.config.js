// src/config/redis.config.js

const Redis = require('ioredis');
require('dotenv').config();

if (!process.env.UPSTASH_REDIS_URL) {
  throw new Error("FATAL ERROR: UPSTASH_REDIS_URL is not defined in .env file.");
}

const redisClient = new Redis(process.env.UPSTASH_REDIS_URL);

redisClient.on('connect', () => {
    console.log('[Redis] Client connected to Upstash Redis successfully.');
});

redisClient.on('error', (err) => {
    console.error('[Redis] Client connection error:', err);
});

module.exports = redisClient;