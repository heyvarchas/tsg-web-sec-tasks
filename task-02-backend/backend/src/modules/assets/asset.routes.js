// Importing express, creating a new router instance and importing other modules
const express = require('express');
const router = express.Router();
const assetController = require('./asset.controller');
const { protect } = require('../../middleware/auth');
const { adminOnly } = require('../../middleware/rbac');

// All routes require authentication
router.use(protect);

// Creating two GET endpoints
router.get('/', assetController.getAllAssets);
router.get('/:id', assetController.getAssetById);

// Admin only
// Endpoints to create, update and delete assets
router.post('/', adminOnly, assetController.createAsset);
router.put('/:id', adminOnly, assetController.updateAsset);
router.delete('/:id', adminOnly, assetController.deleteAsset);

module.exports = router;