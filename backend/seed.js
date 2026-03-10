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
    description: ["Portable speaker with powerful stereo sound.", "Bluetooth connectivity with stable signal range.", "Compact design easy to carry anywhere."]
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
    description: ["Track steps, heart rate and calories burned.", "Water resistant design for workouts.", "Smart notifications synced with your phone."]
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
    description: ["Adjustable brightness LED desk lamp.", "Modern minimal design for workspace.", "Touch sensitive controls with 3 color modes."]
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
    description: ["Padded laptop compartment fits up to 15.6 inch.", "Multiple pockets for organized storage.", "Water resistant durable fabric for daily commute."]
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
    description: ["High quality ceramic mug for coffee lovers.", "Microwave and dishwasher safe design.", "Large 350ml capacity for your morning brew."]
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
    description: ["Ergonomic laptop stand improves posture.", "Aluminum build for durability and heat dissipation.", "Adjustable angles from 15 to 50 degrees."]
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
    description: ["Active noise cancellation for immersive audio.", "Over ear cushioned design for all day comfort.", "Up to 30 hours battery life on single charge."]
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
    description: ["Stylish canvas art for modern interiors.", "Ready to hang with included hardware.", "Fade resistant printing for lasting vibrancy."]
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
    description: ["Bright LED display for easy viewing.", "Dual alarm settings with snooze function.", "USB charging port built into the base."]
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
    description: ["BPA free eco friendly bottle.", "Leak proof lid great for outdoor activities.", "Holds 750ml with easy grip design."]
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
    description: ["Thermal insulation keeps drinks hot for hours.", "Spill proof lid safe for commuting.", "Fits standard car cup holders."]
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
    description: ["Comfortable ergonomic design reduces wrist strain.", "Silent click buttons for quiet environments.", "Long battery life up to 18 months."]
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
    description: ["Premium quality paper for journaling.", "Hardcover lay flat binding design.", "200 lined pages with bookmark ribbon."]
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
    description: ["Double wall insulation stainless steel.", "Keeps cold 24 hours hot 12 hours.", "Wide mouth for ice cubes and easy cleaning."]
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
    description: ["Non slip surface high density cushioning.", "6mm thick for joint protection and comfort.", "Eco friendly TPE material with carry strap."]
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
    description: ["Soft breathable cotton fabric.", "Machine washable easy care fabric.", "Available in multiple colors for every bedroom."]
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
    description: ["Slim minimalist premium leather design.", "Holds up to 8 cards with cash pocket.", "RFID blocking technology for card security."]
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
    description: ["Low maintenance natural indoor greenery.", "Improves air quality and workspace mood.", "Comes in a stylish ceramic pot ready to display."]
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
    description: ["Customizable RGB mechanical keyboard.", "Blue switch tactile feedback for fast typing.", "Anti ghosting N key rollover for gaming accuracy."]
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
    description: ["Large anti slip rubber base gaming pad.", "900x400mm extended size covers full desk.", "Smooth micro weave surface for precise control."]
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
    description: ["Fast charging compact travel design.", "65W GaN technology charges laptop and phone.", "Universal compatibility with USB-C devices."]
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
    description: ["Premium wooden finish desk organizer.", "5 compartment slots for pens cards and accessories.", "Sturdy bamboo construction with natural finish."]
  },
  {
    title: "Adjustable Phone Stand",
    price: 11.99,
    category: "electronics",
    image: "https://m.media-amazon.com/images/I/71XP0dBRcEL._SL1500_.jpg",
    image_1: "https://m.media-amazon.com/images/I/61G+p87P5KL._SL1200_.jpg",
    image_2: "https://m.media-amazon.com/images/I/616+KlaugxL._SL1000_.jpg",
    rating: 4.4,
    reviews: 380,
    lastMonthSales: 140,
    trending: false,
    description: ["Foldable portable adjustable viewing angle.", "Compatible with all smartphones and tablets.", "Non slip silicone pads prevent scratching."]
  },
  {
    title: "Premium Stainless Steel Water Bottle",
    price: 27.99,
    category: "sports",
    image: "https://m.media-amazon.com/images/I/61XN9zBMCXL._SL1500_.jpg",
    image_1: "https://m.media-amazon.com/images/I/71qPCHdPJtL._SL1500_.jpg",
    image_2: "https://m.media-amazon.com/images/I/61yT5StUepL._SL1500_.jpg",
    rating: 4.6,
    reviews: 520,
    lastMonthSales: 210,
    trending: true,
    description: ["Vacuum insulated keeps drinks cold for 24 hours.", "Durable stainless steel construction.", "Perfect for outdoor activities and travel."]
  },
  {
    title: "Wireless Charging Pad",
    price: 18.99,
    category: "electronics",
    image: "https://m.media-amazon.com/images/I/61CGHv6kmWL._SL1000_.jpg",
    image_1: "https://m.media-amazon.com/images/I/71hCPCZozbL._SL1500_.jpg",
    image_2: "https://m.media-amazon.com/images/I/61gKPSHJEnL._SL1500_.jpg",
    rating: 4.5,
    reviews: 680,
    lastMonthSales: 250,
    trending: true,
    description: ["Fast wireless charging for compatible devices.", "Non slip surface prevents device slipping.", "Compact sleek design fits any desk."]
  },
  {
    title: "Cashmere Wool Scarf",
    price: 44.99,
    category: "fashion",
    image: "https://m.media-amazon.com/images/I/81Kx2+HTBFL._SL1500_.jpg",
    image_1: "https://m.media-amazon.com/images/I/71c3RaFQgYL._SL1500_.jpg",
    image_2: "https://m.media-amazon.com/images/I/71BSKyZMepL._SL1500_.jpg",
    rating: 4.7,
    reviews: 395,
    lastMonthSales: 145,
    trending: true,
    description: ["Luxurious cashmere and wool blend.", "Perfect for autumn and winter seasons.", "Versatile neutral colors complement any outfit."]
  },
  {
    title: "Bamboo Cutting Board Set",
    price: 32.99,
    category: "home",
    image: "https://m.media-amazon.com/images/I/71pIi9cGqpL._SL1500_.jpg",
    image_1: "https://m.media-amazon.com/images/I/81h7F0NXNGL._SL1500_.jpg",
    image_2: "https://m.media-amazon.com/images/I/71WG1vZRJXL._SL1500_.jpg",
    rating: 4.4,
    reviews: 310,
    lastMonthSales: 115,
    trending: false,
    description: ["Set of 3 eco friendly bamboo boards.", "Naturally antimicrobial and durable.", "Easy to clean and maintain kitchen essential."]
  },
  {
    title: "Smart LED Light Bulbs Pack",
    price: 35.99,
    category: "electronics",
    image: "https://m.media-amazon.com/images/I/51UZtBsOEcL._SL1000_.jpg",
    image_1: "https://m.media-amazon.com/images/I/61ys6gS8NHL._SL1000_.jpg",
    image_2: "https://m.media-amazon.com/images/I/71jc5RaJNeL._SL1500_.jpg",
    rating: 4.6,
    reviews: 920,
    lastMonthSales: 340,
    trending: true,
    description: ["Control brightness and color via smartphone app.", "Compatible with most smart home systems.", "Energy efficient saves electricity bills."]
  },
  {
    title: "Canvas Sneakers",
    price: 49.99,
    category: "fashion",
    image: "https://m.media-amazon.com/images/I/71IKxWI2qLL._SL1500_.jpg",
    image_1: "https://m.media-amazon.com/images/I/71p2KUVJ7TL._SL1500_.jpg",
    image_2: "https://m.media-amazon.com/images/I/71gChE0NWIL._SL1500_.jpg",
    rating: 4.5,
    reviews: 560,
    lastMonthSales: 225,
    trending: false,
    description: ["Classic canvas upper with rubber sole.", "Comfortable cushioned insole for all day wear.", "Versatile style matches casual and semi formal."]
  },
  {
    title: "Stainless Steel Kitchen Scales",
    price: 26.99,
    category: "home",
    image: "https://m.media-amazon.com/images/I/71SjFNrGajL._SL1500_.jpg",
    image_1: "https://m.media-amazon.com/images/I/61LixKXPGAL._SL1500_.jpg",
    image_2: "https://m.media-amazon.com/images/I/61sWg7wEfcL._SL1500_.jpg",
    rating: 4.3,
    reviews: 440,
    lastMonthSales: 165,
    trending: false,
    description: ["Digital display with precise measurement.", "Tare function for easy portion control.", "Stainless steel platform easy to clean."]
  },
  {
    title: "Cordless Electric Drill",
    price: 64.99,
    category: "electronics",
    image: "https://m.media-amazon.com/images/I/71MTFdVEFtL._SL1500_.jpg",
    image_1: "https://m.media-amazon.com/images/I/61yG3VaOp7L._SL1500_.jpg",
    image_2: "https://m.media-amazon.com/images/I/71cUl1tPJBL._SL1500_.jpg",
    rating: 4.7,
    reviews: 780,
    lastMonthSales: 290,
    trending: true,
    description: ["High torque powerful drilling performance.", "Rechargeable lithium ion battery included.", "Multiple speed settings for various applications."]
  },
  {
    title: "Vintage Style Sunglasses",
    price: 31.99,
    category: "fashion",
    image: "https://m.media-amazon.com/images/I/61vSAs9-oJL._SL1500_.jpg",
    image_1: "https://m.media-amazon.com/images/I/71j3GbCMEzL._SL1500_.jpg",
    image_2: "https://m.media-amazon.com/images/I/61bhZMmxSeL._SL1500_.jpg",
    rating: 4.4,
    reviews: 475,
    lastMonthSales: 195,
    trending: false,
    description: ["UV protection blocks harmful sun rays.", "Retro aviator design never goes out of style.", "Lightweight comfortable for extended wear."]
  },
  {
    title: "Aromatherapy Essential Oil Diffuser",
    price: 28.99,
    category: "home",
    image: "https://m.media-amazon.com/images/I/61wFHBbsZ1L._SL1000_.jpg",
    image_1: "https://m.media-amazon.com/images/I/71oqbFnZ9TL._SL1500_.jpg",
    image_2: "https://m.media-amazon.com/images/I/71w2M0KVVuL._SL1500_.jpg",
    rating: 4.6,
    reviews: 615,
    lastMonthSales: 240,
    trending: true,
    description: ["Ultrasonic misting with LED light effects.", "Whisper quiet operation perfect for bedrooms.", "Auto shut off after 8 hours of use."]
  },
  {
    title: "Portable Projector",
    price: 89.99,
    category: "electronics",
    image: "https://m.media-amazon.com/images/I/71J1WQFQC5L._SL1500_.jpg",
    image_1: "https://m.media-amazon.com/images/I/61a7GGXmpnL._SL1500_.jpg",
    image_2: "https://m.media-amazon.com/images/I/71YA4qJDFUL._SL1500_.jpg",
    rating: 4.5,
    reviews: 540,
    lastMonthSales: 185,
    trending: true,
    description: ["1080p resolution with vibrant color accuracy.", "Lightweight portable design great for travel.", "Multiple connectivity options HDMI USB."]
  },
  {
    title: "Knitted Winter Beanie",
    price: 16.99,
    category: "fashion",
    image: "https://m.media-amazon.com/images/I/71AqkSaVCjL._SL1500_.jpg",
    image_1: "https://m.media-amazon.com/images/I/61vC6TRiWpL._SL1500_.jpg",
    image_2: "https://m.media-amazon.com/images/I/61PxPMHnBfL._SL1500_.jpg",
    rating: 4.3,
    reviews: 380,
    lastMonthSales: 155,
    trending: false,
    description: ["Soft warm acrylic knit material.", "One size fits most design.", "Available in multiple trendy colors."]
  },
  {
    title: "Stainless Steel Thermos Flask",
    price: 23.99,
    category: "sports",
    image: "https://m.media-amazon.com/images/I/61pXMM1FIJL._SL1500_.jpg",
    image_1: "https://m.media-amazon.com/images/I/71TS5HQLQAL._SL1500_.jpg",
    image_2: "https://m.media-amazon.com/images/I/71sMWOJIR-L._SL1500_.jpg",
    rating: 4.6,
    reviews: 495,
    lastMonthSales: 175,
    trending: false,
    description: ["Keeps hot beverages hot for 12 hours.", "Wide mouth opening easy to fill and clean.", "Leak proof screw cap ideal for on the go."]
  },
  {
    title: "USB Hub Expansion Port",
    price: 14.99,
    category: "electronics",
    image: "https://m.media-amazon.com/images/I/71W1HWKDCEL._SL1500_.jpg",
    image_1: "https://m.media-amazon.com/images/I/71SqkHJAmIL._SL1500_.jpg",
    image_2: "https://m.media-amazon.com/images/I/61vgLfB4SuL._SL1500_.jpg",
    rating: 4.4,
    reviews: 520,
    lastMonthSales: 210,
    trending: false,
    description: ["7 USB ports with high speed data transfer.", "Individual switches for each port.", "Compact design saves desk space."]
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
    console.log("🚀 All 30 products with 3 images each successfully uploaded!");

  } catch (err) {
    console.error("❌ Error seeding data:", err.message);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed.");
    process.exit();
  }
};

seedDB();
