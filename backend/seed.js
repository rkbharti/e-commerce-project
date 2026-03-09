const mongoose = require('mongoose');
const Product = require('./models/Product'); // Ensure path is correct
require('dotenv').config();

// 💡 Apna purana data yahan paste karein (Jo product.js file mein tha)
const productsData = [
  { 
    title: "Classic Sneakers", 
    price: 80, 
    category: "fashion", 
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    description: "Comfortable and stylish sneakers."
  },
  { 
    title: "Smart Watch", 
    price: 150, 
    category: "electronics", 
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    description: "Latest generation smart watch."
  }
  // Yahan apne baki saare products add kar dein...
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected for seeding...");

    await Product.deleteMany({}); // Purana khali data delete karne ke liye
    await Product.insertMany(productsData); // Naya data insert karne ke liye

    console.log("🚀 Data successfully uploaded to MongoDB!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};

seedDB();