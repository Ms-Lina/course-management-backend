// src/middleware/validator.middleware.js

const { body, validationResult } = require('express-validator');

const userRegistrationRules = () => [
    body('name').notEmpty().withMessage('Name is required.'),
    body('email').isEmail().withMessage('Must be a valid email address.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
    body('role').isIn(['Manager', 'Facilitator', 'Student']).withMessage('Invalid role specified.'),
];

const userLoginRules = () => [
    body('email').isEmail().withMessage('Must be a valid email address.'),
    body('password').notEmpty().withMessage('Password is required.'),
];

const allocationRules = () => [
    body('moduleName').notEmpty().withMessage('Module name is required.'),
    body('className').notEmpty().withMessage('Class name is required.'),
    body('trimester').isInt({ min: 1 }).withMessage('Trimester must be a positive integer.'),
    body('facilitatorId').isInt().withMessage('A valid facilitator ID is required.'),
];

const activityLogRules = () => [
    body('allocationId').isInt().withMessage('A valid allocation ID is required.'),
    body('weekNumber').isInt({ min: 1 }).withMessage('Week number must be a positive integer.'),
    body('attendance').isArray().withMessage('Attendance must be an array.'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = errors.array().map(err => ({ [err.path]: err.msg }));
    return res.status(422).json({ errors: extractedErrors });
};

// This is a common pattern to export multiple functions
module.exports = {
    userRegistrationRules,
    userLoginRules,
    allocationRules,
    activityLogRules,
    validate,
};