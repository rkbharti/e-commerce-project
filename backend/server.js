const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Routes (We will create these next)
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// 1. Better Middleware Configuration
app.use(express.json()); 
app.use(cors({
    origin: 'http://localhost:5173', // Security: Only allow your frontend to connect
    credentials: true
}));

// 2. Optimized Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected Successfully");
    } catch (err) {
        console.error("❌ MongoDB Connection Failed:", err.message);
        process.exit(1); // Exit process with failure
    }
};
connectDB();

// 3. API Routes
// This keeps server.js clean. All auth logic stays in authRoutes.js
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// 4. Global Error Handler (Interviewer will love this)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong on the server!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));