/**
 * Booking Model
 * Mongoose schema for user bookings
 */

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['hotel', 'restaurant', 'attraction', 'ride', 'guide'],
      required: true,
    },
    checkIn: {
      type: Date,
    },
    checkOut: {
      type: Date,
    },
    date: {
      type: String,
      required: true,
    },
    guests: {
      type: Number,
      default: 1,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Booking', bookingSchema);
