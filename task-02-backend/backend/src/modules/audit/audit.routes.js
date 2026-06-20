const express = require('express');
const router = express.Router();
const auditController = require('./audit.controller');
const { protect } = require('../../middleware/auth');
const { adminOnly } = require('../../middleware/rbac');

router.use(protect);
router.use(adminOnly);

router.get('/', auditController.getFullAuditLog);
router.get('/asset/:assetId', auditController.getAuditByAsset);

module.exports = router;