import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import config from './config/config.js';
import authRoutes from './routes/authRoutes.js';
import riderRoutes from './routes/riderRoutes.js';
import riderController from './controllers/riderController.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/riders', riderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Connect to MongoDB with improved error handling
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log("✅ MongoDB connected successfully");
        // Start server only after successful database connection
        server.listen(config.PORT, () => {
            console.log(`🚀 Server running on port ${config.PORT}`);
            console.log('📝 API Documentation:');
            console.log('   - POST /api/auth/register - Register new admin');
            console.log('   - POST /api/auth/login - Login admin');
            console.log('   - GET /api/auth/me - Get current user');
            console.log('   - GET /api/riders - Get all riders');
            console.log('   - POST /api/riders - Create new rider');
            
        });
    })
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1); // Exit if cannot connect to database
    });

// Socket.io
io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    socket.on("send-location", async (data) => {
        try {
            if (!data || !data.riderId || !data.location) {
                throw new Error('Invalid location data format');
            }
            const updatedRider = await riderController.updateRiderLocation(data);
            io.emit("receive-location", data);
        } catch (err) {
            console.error("Location update error:", err);
            socket.emit("error", { message: "Failed to update location", error: err.message });
        }
    });

    socket.on("disconnect", () => {
        console.log("🔴 Client disconnected:", socket.id);
    });
});

// Graceful shutdown handler
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed');
            process.exit(0);
        });
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed');
            process.exit(0);
        });
    });
});
