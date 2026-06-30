// import everything from audit.service into this
const auditService = require('./audit.service');

// An async controller function to obtain entire Audit log
const getFullAuditLog = async (req, res, next) => {
    try {
        const result = await auditService.getFullAuditLog(req.query);
        res.status(200).json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
};

// Suppose we want to find the audit using an asset
const getAuditByAsset = async (req, res, next) => {
    try {
        const result = await auditService.getAuditByAsset(req.params.assetId, req.query);
        res.status(200).json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
};

module.exports = { getFullAuditLog, getAuditByAsset };