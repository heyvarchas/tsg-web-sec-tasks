const express = require('express');
const router = express.Router();
const assetController = require('./asset.controller');
const { protect } = require('../../middleware/auth');
const { adminOnly } = require('../../middleware/rbac');

// All routes require authentication
router.use(protect);

router.get('/', assetController.getAllAssets);
router.get('/:id', assetController.getAssetById);

// Admin only
router.post('/', adminOnly, assetController.createAsset);
router.put('/:id', adminOnly, assetController.updateAsset);
router.delete('/:id', adminOnly, assetController.deleteAsset);

module.exports = router;