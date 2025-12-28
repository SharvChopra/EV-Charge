const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Station = require('../models/Station');
const Booking = require('../models/Booking');

// Middleware to ensure admin
// Middleware to ensure admin
const adminAuth = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied. Admin only.' });
        }
        // Attach full user to request if needed, or just proceed
        next();
    } catch (err) {
        res.status(500).send('Server Error in Admin Auth');
    }
};

// @route   GET /api/admin/stats
// @desc    Get dashboard overview stats
// @access  Private/Admin
router.get('/stats', auth, adminAuth, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeStations = await Station.countDocuments(); // Add status check if 'status' field exists
        const totalBookings = await Booking.countDocuments();

        // Calculate Revenue (Sum of totalCost in confirmed/completed bookings)
        const revenueAgg = await Booking.aggregate([
            { $match: { status: { $in: ['confirmed', 'completed'] } } },
            { $group: { _id: null, total: { $sum: "$totalCost" } } }
        ]);
        const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

        res.json({
            users: totalUsers,
            stations: activeStations,
            bookings: totalBookings,
            revenue: totalRevenue
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/admin/analytics
// @desc    Get data for charts (Bookings over time)
// @access  Private/Admin
router.get('/analytics', auth, adminAuth, async (req, res) => {
    try {
        // Daily Bookings (Last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const dailyBookings = await Booking.aggregate([
            { $match: { createdAt: { $gte: sevenDaysAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 },
                    revenue: { $sum: "$totalCost" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({ dailyBookings });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/admin/bookings
// @desc    Get all bookings with user and station details
// @access  Private/Admin
router.get('/bookings', auth, adminAuth, async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/admin/transactions
// @desc    Get all transactions (bookings with financial data)
// @access  Private/Admin
router.get('/transactions', auth, adminAuth, async (req, res) => {
    try {
        const transactions = await Booking.find({
            status: { $in: ['confirmed', 'completed'] }
        })
            .select('user stationName totalCost transactionHash createdAt status')
            .populate('user', 'name email')
            .sort({ createdAt: -1 });

        res.json(transactions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/admin/bookings/:id/cancel
// @desc    Cancel a booking
// @access  Private/Admin
router.put('/bookings/:id/cancel', auth, adminAuth, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ msg: 'Booking not found' });
        }

        booking.status = 'cancelled';
        await booking.save();
        res.json(booking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/admin/users/:id/block
// @desc    Block or Unblock a user
// @access  Private/Admin
router.put('/users/:id/block', auth, adminAuth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Prevent blocking yourself
        if (user._id.toString() === req.user.id) {
            return res.status(400).json({ msg: 'Cannot block yourself' });
        }

        user.isBlocked = !user.isBlocked; // Toggle status
        await user.save();
        res.json({ msg: `User ${user.isBlocked ? 'blocked' : 'unblocked'}`, isBlocked: user.isBlocked });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
