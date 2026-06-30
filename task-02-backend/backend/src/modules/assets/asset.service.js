// we;re using qrcodes to show uniqueness of models
const QRCode = require('qrcode');
const Asset = require('./asset.model');

// Creating an asset
const createAsset = async (data) => {
    const { name, category, serialNumber, description } = data;

    const existing = await Asset.findOne({ serialNumber });
    if (existing) {
        const err = new Error('Serial number already exists');
        err.statusCode = 409;
        throw err;
    }

    // Generate QR code as a base64 data URL
    const asset = await Asset.create({ name, category, serialNumber, description });
    const qrCode = await QRCode.toDataURL(`DIMS:${asset._id}`);
    asset.qrCode = qrCode;
    await asset.save();

    return asset;
};

// one for getting all existing assets
const getAllAssets = async (query) => {
    // destructuring
    const { search, category, status, page = 1, limit = 10 } = query;

    // filter object (empty)
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = new RegExp(category, 'i');
    if (search) {
        filter.$or = [
        { name: new RegExp(search, 'i') },
        { serialNumber: new RegExp(search, 'i') },
        ];
    }

    // determining how many documents mongodb should skip
    const skip = (page - 1) * limit;
    const [assets, total] = await Promise.all([
        Asset.find(filter).skip(skip).limit(parseInt(limit)).sort({ createdAt: -1 }),
        Asset.countDocuments(filter),
    ]);

    return { assets, total, page: parseInt(page), limit: parseInt(limit) };
};

// function to get asset using its id
const getAssetById = async (id) => {
    const asset = await Asset.findById(id);
    if (!asset) {
        const err = new Error('Asset not found');
        err.statusCode = 404;
        throw err;
    }
    return asset;
};

// updating an asset (admin only, handles in asset.routes)
const updateAsset = async (id, data) => {
    const asset = await Asset.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
    if (!asset) {
        const err = new Error('Asset not found');
        err.statusCode = 404;
        throw err;
    }
    return asset;
};

// deletion of an asset (also admin only, handles in asset.routes)
const deleteAsset = async (id) => {
    const asset = await Asset.findByIdAndDelete(id);
    if (!asset) {
        const err = new Error('Asset not found');
        err.statusCode = 404;
        throw err;
    }
    return asset;
};

module.exports = { createAsset, getAllAssets, getAssetById, updateAsset, deleteAsset };