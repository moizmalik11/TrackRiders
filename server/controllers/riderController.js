import Rider from '../models/rider.js';

// Get all riders
export const getAllRiders = async (req, res) => {
    try {
        const riders = await Rider.find().sort({ createdAt: -1 });
        res.json(riders);
    } catch (error) {
        console.error('Get all riders error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get active riders
export const getActiveRiders = async (req, res) => {
    try {
        const riders = await Rider.find({ status: { $in: ['free', 'busy'] } }).sort({ createdAt: -1 });
        res.json(riders);
    } catch (error) {
        console.error('Get active riders error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add new rider
export const addRider = async (req, res) => {
    try {
        const { name, riderId, phone, vehicle } = req.body;

        // Validate required fields
        if (!name || !riderId || !phone || !vehicle) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if rider with same ID exists
        const existingRider = await Rider.findOne({ riderId });
        if (existingRider) {
            return res.status(400).json({ message: 'Rider ID already exists' });
        }

        // Create new rider
        const rider = new Rider({
            name,
            riderId,
            phone,
            vehicle,
            status: 'free',
            location: {
                type: 'Point',
                coordinates: [0, 0]
            }
        });

        await rider.save();
        res.status(201).json(rider);
    } catch (error) {
        console.error('Add rider error:', error);
        res.status(500).json({ message: 'Error creating rider' });
    }
};

// Update rider
export const updateRider = async (req, res) => {
    try {
        const { status, currentOrder } = req.body;
        const rider = await Rider.findOneAndUpdate(
            { riderId: req.params.riderId },
            { status, currentOrder },
            { new: true }
        );

        if (!rider) {
            return res.status(404).json({ message: 'Rider not found' });
        }

        res.json(rider);
    } catch (error) {
        console.error('Update rider error:', error);
        res.status(500).json({ message: 'Error updating rider' });
    }
};

// Update rider location
export const updateLocation = async (req, res) => {
    try {
        const { coordinates } = req.body;
        const rider = await Rider.findOneAndUpdate(
            { riderId: req.params.riderId },
            {
                location: {
                    type: 'Point',
                    coordinates
                }
            },
            { new: true }
        );

        if (!rider) {
            return res.status(404).json({ message: 'Rider not found' });
        }

        res.json(rider);
    } catch (error) {
        console.error('Update location error:', error);
        res.status(500).json({ message: 'Error updating location' });
    }
};

// Get rider by ID
export const getRiderById = async (req, res) => {
    try {
        const { riderId } = req.params;
        const rider = await Rider.findOne({ riderId });

        if (!rider) {
            return res.status(404).json({ message: 'Rider not found' });
        }

        res.json(rider);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete rider
export const deleteRider = async (req, res) => {
    try {
        const { riderId } = req.params;
        const rider = await Rider.findOneAndDelete({ riderId });

        if (!rider) {
            return res.status(404).json({ message: 'Rider not found' });
        }

        res.json({ message: 'Rider deleted successfully' });
    } catch (error) {
        console.error('Delete rider error:', error);
        res.status(500).json({ message: 'Error deleting rider' });
    }
};

// Rider login
export const loginRider = async (req, res) => {
    try {
        const { riderId, password } = req.body;
        const rider = await Rider.findOne({ riderId });
        if (!rider) {
            return res.status(404).json({ message: 'Rider not found' });
        }
        if (rider.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        res.json({
            message: 'Login success',
            rider: {
                name: rider.name,
                status: rider.status,
                vehicle: rider.vehicle,
                riderId: rider.riderId,
                currentOrder: rider.currentOrder,
                orderHistory: rider.orderHistory
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mark order as delivered
export const deliverOrder = async (req, res) => {
    try {
        const { riderId } = req.params;
        const rider = await Rider.findOne({ riderId });
        if (!rider) {
            return res.status(404).json({ message: 'Rider not found' });
        }
        if (!rider.currentOrder) {
            return res.status(400).json({ message: 'No current order to deliver' });
        }
        // Move currentOrder to orderHistory
        rider.orderHistory.push({
            ...rider.currentOrder,
            deliveredAt: new Date()
        });
        rider.currentOrder = null;
        rider.status = 'free';
        await rider.save();
        res.json({ message: 'Order delivered', rider: {
            name: rider.name,
            status: rider.status,
            vehicle: rider.vehicle,
            riderId: rider.riderId,
            currentOrder: rider.currentOrder,
            orderHistory: rider.orderHistory
        } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    getAllRiders,
    getActiveRiders,
    addRider,
    updateRider,
    updateLocation,
    getRiderById,
    deleteRider,
    loginRider,
    deliverOrder
}; 