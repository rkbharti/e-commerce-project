const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const productsData = [
    {
      title: "Wireless Noise Cancelling Earbuds",
      price: 39.99,
      category: "electronics",
      image: "https://m.media-amazon.com/images/I/61WRrNa6BIL._SL1500_.jpg",
      image_1: "https://m.media-amazon.com/images/I/61NnPCGffML._SL1500_.jpg",
      image_2: "https://m.media-amazon.com/images/I/71o30jo6nRL._SL1500_.jpg",
      rating: 4.6,
      reviews: 1240,
      lastMonthSales: 320,
      trending: true,
      description: ["Immersive sound with deep bass and clear vocals.", "Comfortable lightweight design for daily use.", "Long battery life with compact charging case."]
    },
    {
      title: "Premium Leather Analog Watch",
      price: 79.99,
      category: "fashion",
      image: "https://m.media-amazon.com/images/I/71YyP9f2S1L._SL1500_.jpg",
      image_1: "https://m.media-amazon.com/images/I/718t8u7WJ3L._SL1500_.jpg",
      image_2: "https://m.media-amazon.com/images/I/81mD9U75pEL._SL1500_.jpg",
      rating: 4.5,
      reviews: 870,
      lastMonthSales: 210,
      trending: true,
      description: ["Classic analog watch with premium leather strap.", "Elegant design suitable for formal and casual wear.", "Durable stainless steel body."]
    },
    {
      title: "Portable Bluetooth Speaker",
      price: 29.99,
      category: "electronics",
      image: "https://m.media-amazon.com/images/I/616WErH3zJL._SL1500_.jpg",
      image_1: "https://m.media-amazon.com/images/I/71Xm8-22hrL._SL1500_.jpg",
      image_2: "https://m.media-amazon.com/images/I/71aQyQDsvwL._SL1500_.jpg",
      rating: 4.4,
      reviews: 620,
      lastMonthSales: 190,
      trending: false,
      description: ["Portable speaker with powerful stereo sound.", "Bluetooth connectivity with stable signal range."]
    },
    {
      title: "Fitness Smartwatch",
      price: 89.99,
      category: "electronics",
      image: "https://m.media-amazon.com/images/I/61ZjlBOp+rL._SL1500_.jpg",
      image_1: "https://m.media-amazon.com/images/I/61SSVxTSs3L._SL1500_.jpg",
      image_2: "https://m.media-amazon.com/images/I/71L6-5S6Z9L._SL1500_.jpg",
      rating: 4.7,
      reviews: 1580,
      lastMonthSales: 430,
      trending: true,
      description: ["Track steps, heart rate and calories burned.", "Water resistant design for workouts."]
    },
    {
      title: "Minimalist Desk Lamp",
      price: 24.99,
      category: "home",
      image: "https://m.media-amazon.com/images/I/619QU1Q3zUL._SL1500_.jpg",
      image_1: "https://m.media-amazon.com/images/I/71OY6HtDEnL._SL1500_.jpg",
      image_2: "https://m.media-amazon.com/images/I/61S8n0R1I0L._SL1500_.jpg",
      rating: 4.3,
      reviews: 340,
      lastMonthSales: 120,
      trending: false,
      description: ["Adjustable brightness LED desk lamp.", "Modern minimal design for workspace."]
    },
    {
      title: "Laptop Travel Backpack",
      price: 39.99,
      category: "fashion",
      image: "https://m.media-amazon.com/images/I/817I+y8S38L._SL1500_.jpg",
      image_1: "https://m.media-amazon.com/images/I/81xU+7VpW2L._SL1500_.jpg",
      image_2: "https://m.media-amazon.com/images/I/91tV5xL1+EL._SL1500_.jpg",
      rating: 4.5,
      reviews: 720,
      lastMonthSales: 260,
      trending: true,
      description: ["Padded laptop compartment.", "Multiple pockets for organized storage."]
    },
    {
      title: "Ceramic Coffee Mug",
      price: 12.99,
      category: "home",
      image: "https://m.media-amazon.com/images/I/51fX166fP+L._SL1000_.jpg",
      image_1: "https://m.media-amazon.com/images/I/51pI-pE8fWL._SL1000_.jpg",
      image_2: "https://m.media-amazon.com/images/I/61G+p87P5KL._SL1200_.jpg",
      rating: 4.4,
      reviews: 410,
      lastMonthSales: 150,
      trending: false,
      description: ["High quality ceramic mug for coffee lovers."]
    },
    {
      title: "Aluminum Laptop Stand",
      price: 34.99,
      category: "electronics",
      image: "https://m.media-amazon.com/images/I/71aQyQDsvwL._SL1500_.jpg",
      image_1: "https://m.media-amazon.com/images/I/71xz8-22hrL._SL1500_.jpg",
      image_2: "https://m.media-amazon.com/images/I/619v7mF7xFL._SL1500_.jpg",
      rating: 4.6,
      reviews: 880,
      lastMonthSales: 240,
      trending: false,
      description: ["Ergonomic laptop stand improves posture.", "Aluminum build for durability."]
    },
    {
      title: "Noise Cancelling Headphones",
      price: 129.99,
      category: "electronics",
      image: "https://m.media-amazon.com/images/I/61MRa0+nUtL._SX522_.jpg",
      image_1: "https://m.media-amazon.com/images/I/612-Tfh2CgL._SL1500_.jpg",
      image_2: "https://m.media-amazon.com/images/I/516mD16+v6L._SL1200_.jpg",
      rating: 4.7,
      reviews: 1420,
      lastMonthSales: 370,
      trending: true,
      description: ["Active noise cancellation for immersive audio."]
    },
    {
      title: "Modern Canvas Wall Art",
      price: 42.99,
      category: "home",
      image: "https://m.media-amazon.com/images/I/81-067E6V7L._SL1500_.jpg",
      image_1: "https://m.media-amazon.com/images/I/81WlK66pYWL._SL1500_.jpg",
      image_2: "https://m.media-amazon.com/images/I/81LCHr7pWKL._SL1500_.jpg",
      rating: 4.4,
      reviews: 280,
      lastMonthSales: 90,
      trending: false,
      description: ["Stylish canvas art for modern interiors."]
    },
    {
      title: "LED Digital Alarm Clock",
      price: 18.99,
      category: "home",
      image: "https://m.media-amazon.com/images/I/61Yrl84Pn-L._SL1500_.jpg",
      image_1: "https://m.media-amazon.com/images/I/71dOAj166SL._SL1500_.jpg",
      image_2: "https://m.media-amazon.com/images/I/61u9o3I7-vL._SL1500_.jpg",
      rating: 4.2,
      reviews: 320,
      lastMonthSales: 110,
      trending: false,
      description: ["Bright LED display for easy viewing."]
    },
    {
      title: "Reusable Water Bottle",
      price: 16.99,
      category: "sports",
      image: "https://m.media-amazon.com/images/I/61pD7Uv5mDL._SL1500_.jpg",
      image_1: "https://m.media-amazon.com/images/I/61S75A6GjmL._SL1500_.jpg",
      image_2: "https://m.media-amazon.com/images/I/61U0T2m990L._SL1500_.jpg",
      rating: 4.5,
      reviews: 540,
      lastMonthSales: 220,
      trending: true,
      description: ["BPA free eco friendly bottle."]
    },
    {
      title: "Travel Coffee Mug",
      price: 22.99,
      category: "home",
      image: "https://m.media-amazon.com/images/I/61ykEJftQnL._SL1024_.jpg",
      image_1: "https://m.media-amazon.com/images/I/616+KlaugxL._SL1000_.jpg",
      image_2: "https://m.media-amazon.com/images/I/51WpS28YhML._SL1000_.jpg",
      rating: 4.6,
      reviews: 460,
      lastMonthSales: 160,
      trending: false,
      description: ["Thermal insulation keeps drinks hot."]
    },
    {
      title: "Wireless Ergonomic Mouse",
      price: 19.99,
      category: "electronics",
      image: "https://m.media-amazon.com/images/I/810kUHKSunL._SL1500_.jpg",
      image_1: "https://m.media-amazon.com/images/I/71KuXWI0KZL._SL1500_.jpg",
      image_2: "https://m.media-amazon.com/images/I/61M6Y2U6pVL._SL1500_.jpg",
      rating: 4.5,
      reviews: 790,
      lastMonthSales: 270,
      trending: false,
      description: ["Comfortable ergonomic design."]
    },
    {
      title: "Personal Development Notebook",
      price: 9.99,
      category: "books",
      image: "https://m.media-amazon.com/images/I/71X1U6m-zPL._SL1500_.jpg",
      image_1: "https://m.media-amazon.com/images/I/71m6k4U6t0L._SL1500_.jpg",
      image_2: "https://m.media-amazon.com/images/I/71N-E6G5zNL._SL1500_.jpg",
      rating: 4.3,
      reviews: 210,
      lastMonthSales: 80,
      trending: false,
      description: ["Premium quality paper for journaling."]
    },
    {
      title: "Thermal Stainless Bottle",
      price: 21.99,
      category: "sports",
      image: "https://m.media-amazon.com/images/I/51H0vS2-M4L._SL1500_.jpg",
      image_1: "https://m.media-amazon.com/images/I/51h68V0iTPL._SL1500_.jpg",
      image_2: "https://m.media-amazon.com/images/I/51yM9W8C9KL._SL1500_.jpg",
      rating: 4.6,
      reviews: 410,
      lastMonthSales: 140,
      trending: false,
      description: ["Double wall insulation stainless steel."]
    },
    {
      title: "Yoga Exercise Mat",
      price: 29.99,
      category: "sports",
      image: "https://m.media-amazon.com/images/I/71bKsC9C4SL._SL1080_.jpg",
      image_1: "https://m.media-amazon.com/images/I/61CzyqVS3GL._SL1080_.jpg",
      image_2: "https://m.media-amazon.com/images/I/611HCqROj0L._SL1080_.jpg",
      rating: 4.7,
      reviews: 630,
      lastMonthSales: 260,
      trending: true,
      description: ["Non slip surface high density cushioning."]
    },
    {
      title: "Soft Cotton Blanket",
      price: 34.99,
      category: "home",
      image: "https://m.media-amazon.com/images/I/81R56-4O5vL._SL1500_.jpg",
      image_1: "https://m.media-amazon.com/images/I/81C6N2K6N3L._SL1500_.jpg",
      image_2: "https://m.media-amazon.com/images/I/81L-e8N6N7L._SL1500_.jpg",
      rating: 4.5,
      reviews: 380,
      lastMonthSales: 120,
      trending: false,
      description: ["Soft breathable cotton fabric."]
    },
    {
      title: "Slim Leather Wallet",
      price: 19.99,
      category: "fashion",
      image: "https://m.media-amazon.com/images/I/81pYV6k9NKL._SL1500_.jpg",
      image_1: "https://m.media-amazon.com/images/I/81xU+7VpW2L._SL1500_.jpg",
      image_2: "https://m.media-amazon.com/images/I/91tV5xL1+EL._SL1500_.jpg",
      rating: 4.6,
      reviews: 510,
      lastMonthSales: 190,
      trending: false,
      description: ["Slim minimalist premium leather design."]
    },
    {
      title: "Indoor Desk Plant",
      price: 15.99,
      category: "home",
      image: "https://m.media-amazon.com/images/I/61X-p8+mKQL._SL1000_.jpg",
      image_1: "https://m.media-amazon.com/images/I/61j+u8+kKXL._SL1000_.jpg",
      image_2: "https://m.media-amazon.com/images/I/71N-E6G5zNL._SL1500_.jpg",
      rating: 4.4,
      reviews: 290,
      lastMonthSales: 130,
      trending: false,
      description: ["Low maintenance natural indoor greenery."]
    },
    {
      title: "Mechanical RGB Keyboard",
      price: 74.99,
      category: "electronics",
      image: "https://m.media-amazon.com/images/I/71f66p89mTL._SL1500_.jpg",
      image_1: "https://m.media-amazon.com/images/I/71N-E6G5zNL._SL1500_.jpg",
      image_2: "https://m.media-amazon.com/images/I/81W3RHyRRlL._SL1500_.jpg",
      rating: 4.7,
      reviews: 1100,
      lastMonthSales: 300,
      trending: true,
      description: ["Customizable RGB mechanical keyboard."]
    },
    {
      title: "Gaming Mouse Pad XL",
      price: 17.99,
      category: "electronics",
      image: "https://m.media-amazon.com/images/I/61N+x-VqVXL._SL1500_.jpg",
      image_1: "https://m.media-amazon.com/images/I/71Xm8-22hrL._SL1500_.jpg",
      image_2: "https://m.media-amazon.com/images/I/71aQyQDsvwL._SL1500_.jpg",
      rating: 4.5,
      reviews: 430,
      lastMonthSales: 170,
      trending: false,
      description: ["Large anti slip rubber base gaming pad."]
    },
    {
      title: "Fast USB-C Charger",
      price: 24.99,
      category: "electronics",
      image: "https://m.media-amazon.com/images/I/51fG+z8M9OL._SL1500_.jpg",
      image_1: "https://m.media-amazon.com/images/I/61G+p87P5KL._SL1200_.jpg",
      image_2: "https://m.media-amazon.com/images/I/616+KlaugxL._SL1000_.jpg",
      rating: 4.4,
      reviews: 540,
      lastMonthSales: 200,
      trending: false,
      description: ["Fast charging compact travel design."]
    },
    {
      title: "Wooden Desk Organizer",
      price: 21.99,
      category: "home",
      image: "https://m.media-amazon.com/images/I/71e+9xzs7oL._SL1140_.jpg",
      image_1: "https://m.media-amazon.com/images/I/715iLrYi8uL._SL1244_.jpg",
      image_2: "https://m.media-amazon.com/images/I/81W3RHyRRlL._SL1500_.jpg",
      rating: 4.3,
      reviews: 250,
      lastMonthSales: 100,
      trending: false,
      description: ["Premium wooden finish desk organizer."]
    },
    {
      title: "Adjustable Phone Stand",
      price: 11.99,
      category: "electronics",
      image: "https://m.media-amazon.com/images/I/61vG+z8M9OL._SL1500_.jpg",
      image_1: "https://m.media-amazon.com/images/I/61G+p87P5KL._SL1200_.jpg",
      image_2: "https://m.media-amazon.com/images/I/616+KlaugxL._SL1000_.jpg",
      rating: 4.4,
      reviews: 380,
      lastMonthSales: 140,
      trending: false,
      description: ["Foldable portable adjustable viewing angle."]
    }
];

const seedDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("✅ MongoDB connected for seeding...");
  
      const deleted = await Product.deleteMany({});
      console.log(`🧹 Old products cleared (${deleted.deletedCount} items)...`);
  
      const formattedData = productsData.map(({ description, ...rest }) => ({
        ...rest,
        description: Array.isArray(description) ? description.join(" ") : description
      }));
  
      await Product.insertMany(formattedData);
      console.log("🚀 All 25 products with 3 images each successfully uploaded!");
  
    } catch (err) {
      console.error("❌ Error seeding data:", err.message);
    } finally {
      await mongoose.connection.close();
      console.log("🔌 MongoDB connection closed.");
      process.exit();
    }
};

seedDB();