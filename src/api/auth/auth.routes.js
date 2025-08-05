// src/api/auth/auth.routes.js

const express = require('express');
const ctrl = require('./auth.controller');
const { userRegistrationRules, userLoginRules, validate } = require('../../middleware/validator.middleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User Registration and Login
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     description: Creates a new user (Manager, Facilitator, or Student).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password, role]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *               email:
 *                 type: string
 *                 example: "jane.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               role:
 *                 type: string
 *                 enum: [Manager, Facilitator, Student]
 *                 example: "Facilitator"
 *     responses:
 *       '201':
 *         description: User created successfully.
 *       '409':
 *         description: Conflict - Email is already in use.
 *       '422':
 *         description: Validation error (e.g., invalid email, short password).
 */
router.post('/register', userRegistrationRules(), validate, ctrl.registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Logs in a user
 *     tags: [Auth]
 *     description: Authenticates a user and returns a JWT token for accessing protected routes.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: "jane.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       '200':
 *         description: Login successful. Returns the user object and JWT token.
 *       '401':
 *         description: Unauthorized - Invalid email or password.
 */
router.post('/login', userLoginRules(), validate, ctrl.loginUser);

module.exports = router;