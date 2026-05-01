import express from 'express';
import riderController from '../controllers/riderController.js';
import auth from '../middleware/auth.js';
const router = express.Router();

// Rider login (no auth required)
router.post('/login', riderController.loginRider);

// Mark order as delivered (no auth required)
router.post('/:riderId/deliver', riderController.deliverOrder);

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

// Delete rider
router.delete('/:riderId', riderController.deleteRider);

export default router; 