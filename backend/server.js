const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
// const productRoutes = require('./routes/productRoutes'); // Agar file hai toh use karein

const app = express();

app.use(express.json()); 
app.use(cors({
    origin: '*', 
    credentials: true
}));

// 1. Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected Successfully");
    } catch (err) {
        console.error("❌ MongoDB Connection Failed:", err.message);
        process.exit(1);
    }
};
connectDB();

// 🟢 STEP 1 FIX: Adding Home Route
// Isse phone par "Cannot GET /" nahi aayega
app.get('/', (req, res) => {
    res.send("🚀 Backend Server is Running and Connected!");
});

// 2. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Products API
app.get('/api/products', async (req, res) => {
    try {
        const Product = require('./models/Product');
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Error fetching products" });
    }
});

// 3. Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong on the server!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));