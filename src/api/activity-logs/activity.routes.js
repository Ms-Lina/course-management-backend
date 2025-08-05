// src/api/activity-logs/activity.routes.js - FINAL CRUD VERSION

const express = require('express');
const { protect, authorize } = require('../../middleware/auth.middleware');
const { activityLogRules, validate } = require('../../middleware/validator.middleware');
const ctrl = require('./activity.controller');
const router = express.Router();
const upload = require('../../middleware/file-upload.middleware');

/**
 * @swagger
 * tags:
 *   name: Activity Logs
 *   description: Facilitator Activity Tracker (FAT) management
 */

// --- Routes for the main collection ---
router.route('/')
    /**
     * @swagger
     * /api/activity-logs:
     *   post:
     *     summary: (C)reate a new weekly activity log (Facilitator Only)
     *     tags: [Activity Logs]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               allocationId: { type: 'integer' }
     *               weekNumber: { type: 'integer' }
     *               logFile: { type: 'string', format: 'binary' }
     *     responses:
     *       '201':
     *         description: Log submitted successfully.
     */
    .post(protect, authorize('Facilitator'), upload, activityLogRules(), validate, ctrl.submitLog)
    /**
     * @swagger
     * /api/activity-logs:
     *   get:
     *     summary: (R)ead all activity logs (Manager Only)
     *     tags: [Activity Logs]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       '200':
     *         description: A list of all activity logs.
     */
    .get(protect, authorize('Manager'), ctrl.getLogs);

// --- NEW: Routes for a specific item ---
router.route('/:id')
    /**
     * @swagger
     * /api/activity-logs/{id}:
     *   put:
     *     summary: (U)pdate a specific activity log (Facilitator Only)
     *     tags: [Activity Logs]
     *     description: A facilitator can only update a log that they own.
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               formativeOneGrading: { type: 'string', enum: [Done, Pending, Not Started] }
     *               logFile: { type: 'string', format: 'binary' }
     *     responses:
     *       '200':
     *         description: Log updated successfully.
     *       '404':
     *         description: Log not found or user is not authorized.
     */
    .put(protect, authorize('Facilitator'), upload, ctrl.updateLog) // Note: No validation rules on update for flexibility
    /**
     * @swagger
     * /api/activity-logs/{id}:
     *   delete:
     *     summary: (D)elete a specific activity log (Facilitator Only)
     *     tags: [Activity Logs]
     *     description: A facilitator can only delete a log that they own.
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       '204':
     *         description: Log deleted successfully.
     *       '404':
     *         description: Log not found or user is not authorized.
     */
    .delete(protect, authorize('Facilitator'), ctrl.deleteLog);

module.exports = router;