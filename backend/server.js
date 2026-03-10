const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
// Import Product Model once at the top
const Product = require('./models/Product'); 

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

// Home Route
app.get('/', (req, res) => {
    res.send("🚀 Backend Server is Running and Connected!");
});

// 2. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// 🛒 Get ALL products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error("All Products Fetch Error:", err);
        res.status(500).json({ message: "Error fetching products" });
    }
});

// 🔍 GET SINGLE Product by ID (Iske bina details page nahi chal raha tha)
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found in Database!" });
        }
        res.json(product);
    } catch (err) {
        console.error("Single Product Fetch Error:", err);
        // Agar ID galat format mein ho toh 400 error
        res.status(400).json({ message: "Invalid Product ID format" });
    }
});

// 3. Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong on the server!' });
});

const PORT = process.env.PORT || 10000; // Render ke liye default 10000

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
})