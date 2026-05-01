const express = require('express');
const router = express.Router();
const riderController = require('../controllers/riderController');
const auth = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(auth);

// Get all riders
router.get('/', riderController.getAllRiders);

// Get active riders
router.get('/active', riderController.getActiveRiders);

// Get rider by ID
router.get('/:riderId', riderController.getRiderById);

// Add new rider
router.post('/', riderController.addRider);

// Update rider
router.put('/:riderId', riderController.updateRider);

// Update rider location
router.put('/:riderId/location', riderController.updateLocation);

module.exports = router; 