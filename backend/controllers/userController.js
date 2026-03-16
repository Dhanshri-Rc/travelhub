/**
 * User Controller
 * Handles user profile and booking operations
 */

const User    = require('../models/User');
const Booking = require('../models/Booking');
const Destination = require('../models/Destination');

// ─── @desc   Get current user's profile
// ─── @route  GET /api/user/profile
// ─── @access Private

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Get profile error:', error.message);
    return res.status(500).json({ success: false, message: 'Server error fetching profile' });
  }
};

// ─── @desc   Update current user's profile
// ─── @route  PUT /api/user/profile
// ─── @access Private

const updateUserProfile = async (req, res) => {
  try {
    const { name, phone, location, notifications } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (name)          user.name     = name;
    if (phone !== undefined) user.phone = phone;
    if (location !== undefined) user.location = location;
    if (notifications) user.notifications = { ...user.notifications, ...notifications };

    const updated = await user.save();

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id:            updated._id,
        name:          updated.name,
        email:         updated.email,
        avatar:        updated.avatar,
        phone:         updated.phone,
        location:      updated.location,
        notifications: updated.notifications,
        createdAt:     updated.createdAt,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error.message);
    return res.status(500).json({ success: false, message: 'Server error updating profile' });
  }
};

// ─── @desc   Get user's bookings
// ─── @route  GET /api/user/bookings
// ─── @access Private

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('destination', 'title location image category price')
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    console.error('Get bookings error:', error.message);
    return res.status(500).json({ success: false, message: 'Server error fetching bookings' });
  }
};

// ─── @desc   Create a new booking
// ─── @route  POST /api/user/bookings
// ─── @access Private

const createBooking = async (req, res) => {
  try {
    const { destinationId, date, guests, notes } = req.body;

    if (!destinationId || !date) {
      return res.status(400).json({ success: false, message: 'destinationId and date are required' });
    }

    const destination = await Destination.findById(destinationId);
    if (!destination) return res.status(404).json({ success: false, message: 'Destination not found' });

    const guestCount   = guests || 1;
    const totalAmount  = destination.price * guestCount;

    const booking = await Booking.create({
      user:        req.user._id,
      destination: destination._id,
      itemName:    destination.title,
      type:        destination.category,
      date,
      guests:      guestCount,
      totalAmount,
      notes:       notes || '',
      status:      'pending',
    });

    return res.status(201).json({ success: true, message: 'Booking created successfully', booking });
  } catch (error) {
    console.error('Create booking error:', error.message);
    return res.status(500).json({ success: false, message: 'Server error creating booking' });
  }
};

// ─── @desc   Cancel a booking
// ─── @route  PUT /api/user/bookings/:id/cancel
// ─── @access Private

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    if (booking.status === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Booking is already cancelled' });
    }

    booking.status = 'cancelled';
    await booking.save();

    return res.status(200).json({ success: true, message: 'Booking cancelled successfully', booking });
  } catch (error) {
    console.error('Cancel booking error:', error.message);
    return res.status(500).json({ success: false, message: 'Server error cancelling booking' });
  }
};

module.exports = { getUserProfile, updateUserProfile, getUserBookings, createBooking, cancelBooking };
