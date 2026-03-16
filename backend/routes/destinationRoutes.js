/**
 * Destination Routes
 * GET  /api/destinations       — list all (filterable)
 * POST /api/destinations       — create new
 * GET  /api/destinations/:id   — get single
 */

const express = require('express');
const router  = express.Router();
const {
  getDestinations,
  getDestinationById,
  createDestination,
} = require('../controllers/destinationController');

router.route('/')
  .get(getDestinations)
  .post(createDestination);

router.route('/:id')
  .get(getDestinationById);

module.exports = router;
