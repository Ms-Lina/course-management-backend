const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../docs/swagger');
const db = require('./models');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', require('./api/auth/auth.routes'));
app.use('/api/allocations', require('./api/allocations/allocation.routes'));
app.use('/api/activity-logs', require('./api/activity-logs/activity.routes'));

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Welcome Route
app.get('/', (req, res) => {
    res.send('Welcome! See /api-docs for documentation.');
});

// Database Sync with Error Logging
db.sequelize.sync()
    .then(() => console.log('[Database] Synced successfully.'))
    .catch((err) => {
        console.error('--- [Database] FAILED TO SYNC ---');
        console.error(err.message);
        console.error('---------------------------------');
    });

module.exports = app;