const Audit = require('./audit.model');

// Async function to log an audit
const logAction = async (assetId, action, performedBy, metadata = {}) => {
    await Audit.create({
        asset: assetId,
        action,
        performedBy,
        metadata,
    });
};

// Function to obtain the entire audit log
const getFullAuditLog = async (query) => {
    const { page = 1, limit = 10, action } = query;
    const skip = (page - 1) * limit;

    const filter = {};
    if (action) filter.action = action;

    const [logs, total] = await Promise.all([
        Audit.find(filter)
        .populate('asset', 'name serialNumber')
        .populate('performedBy', 'name email')
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 }),
        Audit.countDocuments(filter),
    ]);

    return { logs, total, page: parseInt(page), limit: parseInt(limit) };
};

// Same thing, but obtaining it using an asset
const getAuditByAsset = async (assetId, query) => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
        Audit.find({ asset: assetId })
        .populate('performedBy', 'name email')
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 }),
        Audit.countDocuments({ asset: assetId }),
    ]);

    return { logs, total, page: parseInt(page), limit: parseInt(limit) };
};

module.exports = { logAction, getFullAuditLog, getAuditByAsset };