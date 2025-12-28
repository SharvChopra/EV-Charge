const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        address: { type: String }
    },
    chargerType: [{ type: String }], // e.g., ['AC', 'DC', 'Type2']
    costPerKwh: { type: Number, required: true },
    availableSlots: { type: Number, default: 4 },
    rating: { type: Number, default: 0 },
    reviews: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: Number,
        comment: String
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Station', stationSchema);
