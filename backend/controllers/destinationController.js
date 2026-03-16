/**
 * Destination Controller
 * Handles CRUD operations for travel destinations
 */

const Destination = require('../models/Destination');

// ─── @desc   Get all destinations (with optional filters)
// ─── @route  GET /api/destinations
// ─── @access Public

const getDestinations = async (req, res) => {
  try {
    const { category, search, womenFriendly, minPrice, maxPrice, sort } = req.query;

    // Build filter object dynamically
    const filter = {};

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (womenFriendly === 'true') {
      filter.womenFriendly = true;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (search) {
      filter.$or = [
        { title:       { $regex: search, $options: 'i' } },
        { location:    { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Sort options
    let sortOption = { createdAt: -1 }; // Default: newest first
    if (sort === 'price_asc')    sortOption = { price: 1 };
    if (sort === 'price_desc')   sortOption = { price: -1 };
    if (sort === 'rating_desc')  sortOption = { rating: -1 };
    if (sort === 'rating_asc')   sortOption = { rating: 1 };

    const destinations = await Destination.find(filter).sort(sortOption);

    return res.status(200).json({
      success: true,
      count: destinations.length,
      destinations,
    });
  } catch (error) {
    console.error('Get destinations error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error fetching destinations',
    });
  }
};

// ─── @desc   Get a single destination by ID
// ─── @route  GET /api/destinations/:id
// ─── @access Public

const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found',
      });
    }

    return res.status(200).json({
      success: true,
      destination,
    });
  } catch (error) {
    console.error('Get destination by ID error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error fetching destination',
    });
  }
};

// ─── @desc   Create a new destination
// ─── @route  POST /api/destinations
// ─── @access Public (in production this should be admin-protected)

const createDestination = async (req, res) => {
  try {
    const {
      title, location, description, image,
      price, rating, category, amenities,
      safetyRating, womenFriendly, safetyFeatures,
    } = req.body;

    // Required field checks
    if (!title || !location || !description || !image || !price || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: title, location, description, image, price, category',
      });
    }

    const destination = await Destination.create({
      title, location, description, image,
      price, rating: rating || 0, category,
      amenities: amenities || [],
      safetyRating: safetyRating || 4.0,
      womenFriendly: womenFriendly || false,
      safetyFeatures: safetyFeatures || [],
    });

    return res.status(201).json({
      success: true,
      message: 'Destination created successfully',
      destination,
    });
  } catch (error) {
    console.error('Create destination error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error creating destination',
    });
  }
};

module.exports = { getDestinations, getDestinationById, createDestination };
