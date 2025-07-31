const { body, validationResult } = require('express-validator');

const rules = {
    userRegistration: [
        body('name').notEmpty().withMessage('Name is required.'),
        body('email').isEmail().withMessage('Must be a valid email address.'),
        body('password').isLength({ min: 6 }).withMessage('Password must be >= 6 characters.'),
        body('role').isIn(['Manager', 'Facilitator', 'Student']).withMessage('Invalid role.'),
    ],
    userLogin: [
        body('email').isEmail().withMessage('Valid email is required.'),
        body('password').notEmpty().withMessage('Password is required.'),
    ],
    allocation: [
        body('moduleName').notEmpty().withMessage('Module name is required.'),
        body('className').notEmpty().withMessage('Class name is required.'),
        body('trimester').isInt({ min: 1 }).withMessage('Trimester is required.'),
        body('facilitatorId').isInt().withMessage('A valid facilitator ID is required.'),
    ],
    activityLog: [
        body('allocationId').isInt().withMessage('A valid allocation ID is required.'),
        body('weekNumber').isInt({ min: 1 }).withMessage('Week number is required.'),
        body('attendance').isArray().withMessage('Attendance must be an array.'),
    ],
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    const extractedErrors = errors.array().map(err => ({ [err.path]: err.msg }));
    return res.status(422).json({ errors: extractedErrors });
};

module.exports = { rules, validate };