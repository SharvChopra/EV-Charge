const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');
const Station = require('../models/Station');

// @route   POST /api/bookings
// @desc    Create a booking
// @access  Private
router.post('/', auth, async (req, res) => {
    const { stationId, stationName, stationAddress, stationCost, startTime, duration } = req.body;

    try {
        let finalStationName = stationName;
        let finalStationAddress = stationAddress;
        let finalCostPerKwh = stationCost;

        // If it's a real MongoDB ID, we can verify it (optional, but good for security)
        // If it's a mock ID (starts with "mock_"), we trust the frontend provided details
        if (!stationId.startsWith('mock_') && stationId.length === 24) {
            const station = await Station.findById(stationId);
            if (station) {
                finalStationName = station.name;
                finalStationAddress = station.location.address;
                finalCostPerKwh = station.costPerKwh;
            }
        }

        // Calculate Cost
        const totalCost = (finalCostPerKwh || 20) * duration;

        const booking = new Booking({
            user: req.user.id,
            station: stationId,
            stationName: finalStationName || 'Unknown Station',
            stationAddress: finalStationAddress || 'Unknown Location',
            startTime,
            duration,
            totalCost,
            totalCost,
            status: 'confirmed', // Auto-confirm for demo
            transactionHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
        });

        await booking.save();
        res.json(booking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/bookings
// @desc    Get user bookings
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
