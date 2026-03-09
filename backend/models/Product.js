const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },     // Pehli Image
    image_1: { type: String },                   // Doosri Image 👈 (Zaroori)
    image_2: { type: String },                   // Teesri Image 👈 (Zaroori)
    description: { type: String },
    rating: { type: Number },                    // Rating ke liye
    reviews: { type: Number },                   // Reviews ke liye
    lastMonthSales: { type: Number },            // Sales count ke liye
    trending: { type: Boolean }                  // Trending badge ke liye
});

module.exports = mongoose.model('Product', productSchema);