// Importing express, creating a router instance and importing important modules
const express = require('express');
const router = express.Router();
const auditController = require('./audit.controller');
const { protect } = require('../../middleware/auth');
const { adminOnly } = require('../../middleware/rbac');

// Here, I want to run middleware on the below endpoints
router.use(protect);
router.use(adminOnly);

// Creating two GET endpoints
router.get('/', auditController.getFullAuditLog);
router.get('/asset/:assetId', auditController.getAuditByAsset);

module.exports = router;