const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Station = require('../models/Station');

// @route   GET /api/stations
// @desc    Get all stations
// @access  Public
router.get('/', async (req, res) => {
    try {
        const stations = await Station.find();
        res.json(stations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/stations
// @desc    Add a station (Admin only - simplification for now)
// @access  Private
router.post('/', auth, async (req, res) => {
    // TODO: Check if user is admin
    // if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Admins only' });

    const { name, lat, lng, address, chargerType, costPerKwh, availableSlots } = req.body;

    try {
        const newStation = new Station({
            name,
            location: { lat, lng, address },
            chargerType,
            costPerKwh,
            availableSlots
        });

        const station = await newStation.save();
        res.json(station);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/stations/:id
// @desc    Update a station
// @access  Private/Admin
router.put('/:id', auth, async (req, res) => {
    // Check if user is admin
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied. Admin only.' });
    }

    const { name, lat, lng, address, chargerType, costPerKwh, availableSlots } = req.body;

    const stationFields = {};
    if (name) stationFields.name = name;
    if (chargerType) stationFields.chargerType = chargerType;
    if (costPerKwh) stationFields.costPerKwh = costPerKwh;
    if (availableSlots) stationFields.availableSlots = availableSlots;

    // Build location object
    stationFields.location = {};
    if (lat) stationFields.location.lat = lat;
    if (lng) stationFields.location.lng = lng;
    if (address) stationFields.location.address = address;

    try {
        let station = await Station.findById(req.params.id);

        if (!station) return res.status(404).json({ msg: 'Station not found' });

        station = await Station.findByIdAndUpdate(
            req.params.id,
            { $set: stationFields },
            { new: true }
        );

        res.json(station);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/stations/:id
// @desc    Delete a station
// @access  Private/Admin
router.delete('/:id', auth, async (req, res) => {
    // Check if user is admin (Assuming req.user.role is populated by auth middleware)
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied. Admin only.' });
    }

    try {
        const station = await Station.findById(req.params.id);
        if (!station) {
            return res.status(404).json({ msg: 'Station not found' });
        }

        await Station.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Station removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Station not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;
