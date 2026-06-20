const auditService = require('./audit.service');

const getFullAuditLog = async (req, res, next) => {
    try {
        const result = await auditService.getFullAuditLog(req.query);
        res.status(200).json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
};

const getAuditByAsset = async (req, res, next) => {
    try {
        const result = await auditService.getAuditByAsset(req.params.assetId, req.query);
        res.status(200).json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
};

module.exports = { getFullAuditLog, getAuditByAsset };