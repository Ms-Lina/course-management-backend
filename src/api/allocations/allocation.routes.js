const express = require('express');
const { protect, authorize } = require('../../middleware/auth.middleware');
const { rules, validate } = require('../../middleware/validator.middleware');
const ctrl = require('./allocation.controller');
const router = express.Router();

router.get('/my-courses', protect, authorize('Facilitator'), ctrl.getMyAllocations);

router.route('/')
    .post(protect, authorize('Manager'), rules.allocation, validate, ctrl.createAllocation)
    .get(protect, authorize('Manager'), ctrl.getAllocations);

router.route('/:id')
    .put(protect, authorize('Manager'), rules.allocation, validate, ctrl.updateAllocation)
    .delete(protect, authorize('Manager'), ctrl.deleteAllocation);

module.exports = router;