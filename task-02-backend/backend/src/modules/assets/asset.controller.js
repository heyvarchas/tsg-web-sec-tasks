const assetService = require('./asset.service');

// Controller function to create an asset
const createAsset = async (req, res, next) => {
    try {
        const asset = await assetService.createAsset(req.body);
        res.status(201).json({ success: true, data: asset });
    } catch (err) {
        next(err);
    }
};

// Async function to get all the assets existing
const getAllAssets = async (req, res, next) => {
    try {
        const result = await assetService.getAllAssets(req.query);
        res.status(200).json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
};

// Using an id to get an asset
const getAssetById = async (req, res, next) => {
    try {
        const asset = await assetService.getAssetById(req.params.id);
        res.status(200).json({ success: true, data: asset });
    } catch (err) {
        next(err);
    }
};

// Updating asset status, etc
const updateAsset = async (req, res, next) => {
    try {
        const asset = await assetService.updateAsset(req.params.id, req.body);
        res.status(200).json({ success: true, data: asset });
    } catch (err) {
        next(err);
    }
};

// deletion of an asset
const deleteAsset = async (req, res, next) => {
    try {
        await assetService.deleteAsset(req.params.id);
        res.status(200).json({ success: true, message: 'Asset deleted successfully' });
    } catch (err) {
        next(err);
    }
};

module.exports = { createAsset, getAllAssets, getAssetById, updateAsset, deleteAsset };