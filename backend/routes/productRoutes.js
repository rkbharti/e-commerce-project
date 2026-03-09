const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 1. Get ALL products (Ye theek tha)
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Error fetching products" });
    }
});

// 2. 🚨 MISSING ROUTE: Get SINGLE product by ID
// Jab aap product details par click karte hain, tab ye kaam aata hai
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product nahi mila bhai!" });
        }
        res.json(product);
    } catch (err) {
        // Agar ID galat format mein ho (invalid MongoDB ID)
        res.status(400).json({ message: "Invalid Product ID" });
    }
});

module.exports = router;