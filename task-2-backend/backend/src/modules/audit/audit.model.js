const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema(
    {
        asset: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset',
        required: [true, 'Asset is required'],
        },
        action: {
        type: String,
        enum: ['created', 'updated', 'deleted', 'issued', 'returned'],
        required: [true, 'Action is required'],
        },
        performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Performed by is required'],
        },
        metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Audit', auditSchema);