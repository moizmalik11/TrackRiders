const Rider = require('../models/Rider');

// Get all riders
exports.getAllRiders = async (req, res) => {
    try {
        const riders = await Rider.find().sort({ createdAt: -1 });
        res.json(riders);
    } catch (error) {
        console.error('Get all riders error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get active riders
exports.getActiveRiders = async (req, res) => {
    try {
        const riders = await Rider.find({ status: { $in: ['free', 'busy'] } }).sort({ createdAt: -1 });
        res.json(riders);
    } catch (error) {
        console.error('Get active riders error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add new rider
exports.addRider = async (req, res) => {
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
exports.updateRider = async (req, res) => {
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
exports.updateLocation = async (req, res) => {
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
exports.getRiderById = async (req, res) => {
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