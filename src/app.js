// src/app.js - CORRECTED VERSION

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../docs/swagger');
const db = require('./models');

// --- IMPORT ROUTERS ---
// We import them at the top now for clarity.
const authRoutes = require('./api/auth/auth.routes');
const allocationRoutes = require('./api/allocations/allocation.routes');
const activityLogRoutes = require('./api/activity-logs/activity.routes');

const app = express();

// --- GLOBAL MIDDLEWARE ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- API ROUTES ---
// This is the section that is now cleaner and more robust.
app.use('/api/auth', authRoutes);
app.use('/api/allocations', allocationRoutes);
app.use('/api/activity-logs', activityLogRoutes);

// --- API DOCUMENTATION ROUTE ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- WELCOME ROUTE ---
app.get('/', (req, res) => {
    res.send('Welcome! The server is running. See /api-docs for documentation.');
});

// --- DATABASE SYNC ---
db.sequelize.sync()
    .then(() => console.log('[Database] Synced successfully.'))
    .catch((err) => console.error('--- [Database] FAILED TO SYNC ---', err));

module.exports = app;