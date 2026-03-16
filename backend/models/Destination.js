/**
 * Destination Model
 * Mongoose schema for travel destinations (hotels, restaurants, attractions, etc.)
 */

const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    // Category: hotel, restaurant, attraction, ride, guide
    category: {
      type: String,
      enum: ['hotel', 'restaurant', 'attraction', 'ride', 'guide'],
      required: [true, 'Category is required'],
    },
    amenities: {
      type: [String],
      default: [],
    },
    // Safety information
    safetyRating: {
      type: Number,
      default: 4.0,
      min: 0,
      max: 5,
    },
    womenFriendly: {
      type: Boolean,
      default: false,
    },
    safetyFeatures: {
      type: [String],
      default: [],
    },
    // Optional extra fields
    originalPrice: {
      type: Number,
      default: null,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for text search across title, location, description
destinationSchema.index({ title: 'text', location: 'text', description: 'text' });

module.exports = mongoose.model('Destination', destinationSchema);
