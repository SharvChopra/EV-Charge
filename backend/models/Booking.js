const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    station: { type: String, required: true }, // Changed from ObjectId to String to support Mock IDs
    stationName: { type: String, required: true }, // Store snapshot
    stationAddress: { type: String },
    startTime: { type: Date, required: true },
    duration: { type: Number, required: true },
    totalCost: { type: Number },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
    paymentId: { type: String },
    transactionHash: { type: String },
    currency: { type: String, default: 'INR' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
