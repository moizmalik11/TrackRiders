const mongoose = require('mongoose');

const riderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    
    phone: {
        type: String,
        required: true,
        trim: true
    },
    
    riderId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    vehicle: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['free', 'busy', 'offline'],
        default: 'free'
    },
    currentOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        default: null
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            default: [0, 0]
        }
    }
}, {
    timestamps: true
});

// Create index for location queries
riderSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Rider', riderSchema);