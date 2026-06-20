const express = require('express');
const router = express.Router();
const issuanceController = require('./issuance.controller');
const { protect } = require('../../middleware/auth');
const { adminOnly } = require('../../middleware/rbac');

router.use(protect);

// Admin only
router.post('/', adminOnly, issuanceController.issueAsset);
router.patch('/:id/return', adminOnly, issuanceController.returnAsset);
router.get('/', adminOnly, issuanceController.getActiveIssuances);

// User can view their own history
router.get('/user/:userId', issuanceController.getUserIssuanceHistory);

module.exports = router;