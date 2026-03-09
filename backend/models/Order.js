const mongoose = require('mongoose');

/**
 * ORDER SCHEMA
 * Ye model finalized transaction ko represent karta hai.
 */
const orderSchema = new mongoose.Schema({
    // Link to User: Order ko user se connect karne ke liye
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: [true, 'User ID is required'] 
    },
    
    // items array mein 'image' field hona zaroori hai
    items: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            image: { type: String, required: true } // Yahan image capture hogi
        }
    ],

    amount: { type: Number, required: true },

    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        zipCode: { type: String, required: true },
        phone: { type: String, required: true }
    },

    status: { 
        type: String, 
        default: 'Processing',
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'] 
    },

    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);