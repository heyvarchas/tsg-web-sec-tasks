const issuanceService = require('./issuance.service');

// Creating a controller function 
const issueAsset = async (req, res, next) => {
    try {
        // Destructuring
        const { assetId, issuedTo, expectedReturn, notes } = req.body;
        const issuedBy = req.user.id;
        const issuance = await issuanceService.issueAsset(assetId, issuedTo, issuedBy, expectedReturn, notes);
        res.status(201).json({ success: true, data: issuance });
    } catch (err) {
        next(err);
    }
};

// Controller for returning an issued asset
const returnAsset = async (req, res, next) => {
    try {
        // getting the authenticated user returning the asset
        const returnedBy = req.user.id;
        const issuance = await issuanceService.returnAsset(req.params.id, returnedBy);
        res.status(200).json({ success: true, data: issuance });
    } catch (err) {
        next(err);
    }
};

// Endpoint for fetching all currently active (not yet returned) asset issuances
const getActiveIssuances = async (req, res, next) => {
    try {
        const result = await issuanceService.getActiveIssuances(req.query);
        res.status(200).json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
};

// Endpoint to fetch the issuance history for a specific user..
const getUserIssuanceHistory = async (req, res, next) => {
    try {
        const result = await issuanceService.getUserIssuanceHistory(req.params.userId, req.query);
        res.status(200).json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
};

module.exports = { issueAsset, returnAsset, getActiveIssuances, getUserIssuanceHistory };