const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// @route   POST /api/orders/place
// @desc    Create a new order and save to database
// @access  Public (Should be Private in production)
router.post('/place', async (req, res) => {
    try {
        /* Destructuring assignment: Extracts data from request body.
           Ensuring 'items' contains our image URLs from the frontend mapping. */
        const { userId, items, amount, address } = req.body;

        // Basic Backend Validation: Prevents saving empty orders
        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, message: "Cart is empty" });
        }

        const newOrder = new Order({
            userId,
            items,   // The schema now supports the 'image' field inside these objects
            amount,  // Total price calculated on frontend
            address
        });

        const savedOrder = await newOrder.save();
        
        console.log(`Order Success: ID ${savedOrder._id} for User ${userId}`);
        res.status(201).json({ 
            success: true, 
            message: "Order placed successfully!", 
            order: savedOrder 
        });

    } catch (err) {
        /* Catching Server Errors: Logging the actual error for the developer 
           but sending a generic message to the client for security. */
        console.error("Order Placement Error:", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// @route   GET /api/orders/userorders/:userId
// @desc    Fetch all orders for a specific user sorted by newest first
router.get('/userorders/:userId', async (req, res) => {
    try {
        /* .sort({ date: -1 }): Ensures the user sees their most recent 
           purchases at the top of the list (UX best practice). */
        const orders = await Order.find({ userId: req.params.userId }).sort({ date: -1 });
        
        res.status(200).json({ success: true, orders });
    } catch (err) {
        console.error("Fetch Orders Error:", err.message);
        res.status(500).json({ success: false, message: "Error fetching order history" });
    }
});

module.exports = router;