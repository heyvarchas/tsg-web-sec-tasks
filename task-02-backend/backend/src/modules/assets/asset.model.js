// Workflow -> import mongoose, create a schema and export
const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema(
    {
        name: {
        type: String,
        required: [true, 'Asset name is required'],
        trim: true,
        },
        category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
        },
        serialNumber: {
        type: String,
        required: [true, 'Serial number is required'],
        unique: true,
        trim: true,
        },
        status: {
        type: String,
        enum: ['available', 'issued', 'maintenance'],
        default: 'available',
        },
        qrCode: {
        type: String,
        },
        description: {
        type: String,
        trim: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Asset', assetSchema);