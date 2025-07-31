const express = require('express');
const { protect, authorize } = require('../../middleware/auth.middleware');
const { rules, validate } = require('../../middleware/validator.middleware');
const ctrl = require('./activity.controller');
const router = express.Router();

router.post('/', protect, authorize('Facilitator'), rules.activityLog, validate, ctrl.submitLog);
router.get('/', protect, authorize('Manager'), ctrl.getLogs);

module.exports = router;