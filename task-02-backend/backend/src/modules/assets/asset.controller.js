const assetService = require('./asset.service');

const createAsset = async (req, res, next) => {
    try {
        const asset = await assetService.createAsset(req.body);
        res.status(201).json({ success: true, data: asset });
    } catch (err) {
        next(err);
    }
};

const getAllAssets = async (req, res, next) => {
    try {
        const result = await assetService.getAllAssets(req.query);
        res.status(200).json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
};

const getAssetById = async (req, res, next) => {
    try {
        const asset = await assetService.getAssetById(req.params.id);
        res.status(200).json({ success: true, data: asset });
    } catch (err) {
        next(err);
    }
};

const updateAsset = async (req, res, next) => {
    try {
        const asset = await assetService.updateAsset(req.params.id, req.body);
        res.status(200).json({ success: true, data: asset });
    } catch (err) {
        next(err);
    }
};

const deleteAsset = async (req, res, next) => {
    try {
        await assetService.deleteAsset(req.params.id);
        res.status(200).json({ success: true, message: 'Asset deleted successfully' });
    } catch (err) {
        next(err);
    }
};

module.exports = { createAsset, getAllAssets, getAssetById, updateAsset, deleteAsset };