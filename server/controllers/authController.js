const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ userId }, config.JWT_SECRET, {
        expiresIn: '7d'
    });
};

// Register new user
exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Validate input
        if (!email || !password || !name) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = new User({
            email,
            password,
            name,
            role: 'admin' // Set role as admin for all registered users
        });

        await user.save();

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            token
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(user._id);

        res.json({
            message: 'Login successful',
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
}; 