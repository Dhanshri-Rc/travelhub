/**
 * User Routes
 * GET  /api/user/profile
 * PUT  /api/user/profile
 * GET  /api/user/bookings
 * POST /api/user/bookings
 * PUT  /api/user/bookings/:id/cancel
 */

const express  = require('express');
const router   = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getUserProfile,
  updateUserProfile,
  getUserBookings,
  createBooking,
  cancelBooking,
} = require('../controllers/userController');

// All user routes are protected
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/bookings')
  .get(protect, getUserBookings)
  .post(protect, createBooking);

router.route('/bookings/:id/cancel')
  .put(protect, cancelBooking);

module.exports = router;
