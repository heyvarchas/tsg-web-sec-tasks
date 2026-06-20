const mongoose = require('mongoose');

const issuanceSchema = new mongoose.Schema(
    {
        asset: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset',
        required: [true, 'Asset is required'],
        },
        issuedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Issued to user is required'],
        },
        issuedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Issued by admin is required'],
        },
        expectedReturn: {
        type: Date,
        required: [true, 'Expected return date is required'],
        },
        returnedAt: {
        type: Date,
        default: null,
        },
        returnedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
        },
        status: {
        type: String,
        enum: ['active', 'returned'],
        default: 'active',
        },
        notes: {
        type: String,
        trim: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Issuance', issuanceSchema);