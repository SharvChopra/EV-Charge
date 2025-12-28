const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    vehicle: {
        model: { type: String },
        batteryCapacity: { type: Number }, // kWh
        currentBattery: { type: Number }, // %
        averageRange: { type: Number }, // km
        chargerType: { type: String, enum: ['Type1', 'Type2', 'CCS2', 'CHAdeMO'], default: 'Type2' }
    },
    createdAt: { type: Date, default: Date.now },
    isBlocked: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
