// src/api/allocations/allocation.routes.js - FINAL CRUD VERSION

const express = require('express');
const { protect, authorize } = require('../../middleware/auth.middleware');
const { allocationRules, validate } = require('../../middleware/validator.middleware');
const ctrl = require('./allocation.controller');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Allocations
 *   description: Course allocation management
 */

// --- Public/Facilitator Routes ---
/**
 * @swagger
 * /api/allocations/my-courses:
 *   get:
 *     summary: Get all courses assigned to the logged-in facilitator (Facilitator Only)
 *     tags: [Allocations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of the facilitator's course offerings.
 */
router.get('/my-courses', protect, authorize('Facilitator'), ctrl.getMyAllocations);

// --- Manager CRUD Routes for the main collection ---
router.route('/')
    /**
     * @swagger
     * /api/allocations:
     *   post:
     *     summary: (C)reate a new course allocation (Manager Only)
     *     tags: [Allocations]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               moduleName: { type: 'string' }
     *               facilitatorId: { type: 'integer' }
     *     responses:
     *       '201':
     *         description: Allocation created successfully.
     */
    .post(protect, authorize('Manager'), allocationRules(), validate, ctrl.createAllocation)
    /**
     * @swagger
     * /api/allocations:
     *   get:
     *     summary: (R)ead all course allocations (Manager Only)
     *     tags: [Allocations]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       '200':
     *         description: A list of all course offerings.
     */
    .get(protect, authorize('Manager'), ctrl.getAllocations);

// --- NEW: Manager CRUD Routes for a specific item ---
router.route('/:id')
    /**
     * @swagger
     * /api/allocations/{id}:
     *   get:
     *     summary: (R)ead a single course allocation by ID (Manager Only)
     *     tags: [Allocations]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       '200':
     *         description: The requested course allocation.
     *       '404':
     *         description: Allocation not found.
     */
    .get(protect, authorize('Manager'), ctrl.getAllocationById) // This GET endpoint is a good addition for full CRUD
    /**
     * @swagger
     * /api/allocations/{id}:
     *   put:
     *     summary: (U)pdate a course allocation (Manager Only)
     *     tags: [Allocations]
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
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               moduleName: { type: 'string' }
     *               facilitatorId: { type: 'integer' }
     *     responses:
     *       '200':
     *         description: Allocation updated successfully.
     *       '404':
     *         description: Allocation not found.
     */
    .put(protect, authorize('Manager'), allocationRules(), validate, ctrl.updateAllocation)
    /**
     * @swagger
     * /api/allocations/{id}:
     *   delete:
     *     summary: (D)elete a course allocation (Manager Only)
     *     tags: [Allocations]
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
     *         description: Allocation deleted successfully. No content returned.
     *       '404':
     *         description: Allocation not found.
     */
    .delete(protect, authorize('Manager'), ctrl.deleteAllocation);

module.exports = router;