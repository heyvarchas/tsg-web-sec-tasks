// Importing imp modules
const Issuance = require('./issuance.model');
const Asset = require('../assets/asset.model');
const { logAction } = require('../audit/audit.service');

// the function that contains all the business logic for issuing an asset
const issueAsset = async (assetId, issuedTo, issuedBy, expectedReturn, notes) => {
    const asset = await Asset.findById(assetId);
    if (!asset) {
        const err = new Error('Asset not found');
        err.statusCode = 404;
        throw err;
    }

    if (asset.status !== 'available') {
        const err = new Error(`Asset is not available. Current status: ${asset.status}`);
        err.statusCode = 400;
        throw err;
    }

    const issuance = await Issuance.create({
        asset: assetId,
        issuedTo,
        issuedBy,
        expectedReturn,
        notes,
    });

    // Flip asset status to issued
    asset.status = 'issued';
    await asset.save();

    // Log the action (appending)
    await logAction(assetId, 'issued', issuedBy, {
        issuedTo,
        expectedReturn,
        issuanceId: issuance._id,
    });

    return issuance.populate(['asset', 'issuedTo', 'issuedBy']);
};

// This deals with an asset being returned
const returnAsset = async (issuanceId, returnedBy) => {
    const issuance = await Issuance.findById(issuanceId);
    if (!issuance) {
        const err = new Error('Issuance record not found');
        err.statusCode = 404;
        throw err;
    }

    if (issuance.status === 'returned') {
        const err = new Error('Asset has already been returned');
        err.statusCode = 400;
        throw err;
    }

    // Update issuance record
    issuance.status = 'returned';
    issuance.returnedAt = new Date();
    issuance.returnedTo = returnedBy;
    await issuance.save();

    // Flip asset status back to available
    await Asset.findByIdAndUpdate(issuance.asset, { status: 'available' });

    // Log the action
    await logAction(issuance.asset, 'returned', returnedBy, {
        issuanceId: issuance._id,
        returnedAt: issuance.returnedAt,
    });

    return issuance.populate(['asset', 'issuedTo', 'issuedBy']);
};

// To check issuances yet to be returned
const getActiveIssuances = async (query) => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [issuances, total] = await Promise.all([
        Issuance.find({ status: 'active' })
        .populate('asset', 'name serialNumber category')
        .populate('issuedTo', 'name email')
        .populate('issuedBy', 'name email')
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 }),
        Issuance.countDocuments({ status: 'active' }),
    ]);

    return { issuances, total, page: parseInt(page), limit: parseInt(limit) };
};

// A log of issuances returned and yet to be returned, with complete data
const getUserIssuanceHistory = async (userId, query) => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [issuances, total] = await Promise.all([
        Issuance.find({ issuedTo: userId })
        .populate('asset', 'name serialNumber category')
        .populate('issuedBy', 'name email')
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 }),
        Issuance.countDocuments({ issuedTo: userId }),
    ]);

    return { issuances, total, page: parseInt(page), limit: parseInt(limit) };
};

module.exports = { issueAsset, returnAsset, getActiveIssuances, getUserIssuanceHistory };