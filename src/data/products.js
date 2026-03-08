const products = [
    {
      id: 1,
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
      description: [
        "Immersive sound with deep bass and clear vocals.",
        "Comfortable lightweight design for daily use.",
        "Long battery life with compact charging case."
      ]
    },
    {
      id: 2,
      title: "Premium Leather Analog Watch",
      price: 79.99,
      category: "fashion",
      image: "https://danielklein.in/cdn/shop/files/DK.1.13819-4.jpg?v=1754031358",
      image_1: "https://img.tatacliq.com/images/i21//437Wx649H/MP000000024725668_437Wx649H_202412151852481.jpeg",
      image_2: "https://img.tatacliq.com/images/i24//437Wx649H/MP000000017063194_437Wx649H_202506111611592.jpeg",
      rating: 4.5,
      reviews: 870,
      lastMonthSales: 210,
      trending: true,
      description: [
        "Classic analog watch with premium leather strap.",
        "Elegant design suitable for formal and casual wear.",
        "Durable stainless steel body with scratch resistant glass."
      ]
    },
    {
      id: 3,
      title: "Portable Bluetooth Speaker",
      price: 29.99,
      category: "electronics",
      image: "https://images.ctfassets.net/javen7msabdh/2K1Oiw3mRsG4NCHY11WvXW/67793ea67b77e5ff65b59a163884a383/emberton-iii-front-desktop-1_x2.jpg?w=1920&fm=avif&q=100",
      image_1: "https://m.media-amazon.com/images/I/31RnuvCDlhL._SX300_SY300_QL70_FMwebp_.jpg",
      image_2: "https://m.media-amazon.com/images/I/616WErH3zJL._SL1500_.jpg",
      rating: 4.4,
      reviews: 620,
      lastMonthSales: 190,
      trending: false,
      description: [
        "Portable speaker with powerful stereo sound.",
        "Bluetooth connectivity with stable signal range.",
        "Compact body ideal for travel and outdoor use."
      ]
    },
    {
      id: 4,
      title: "Fitness Smartwatch",
      price: 89.99,
      category: "electronics",
      image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ8qC90r6zXB9_z-Xf5VN571MqWJmvgHKM_il2PYSalx7YQZjRgLGrp0qA2nd2u_MxLBUuAsLDGfK0p67uJawI_3K5F438H3ySvXdrTV42YgxYhrOdzwU7hj-uf",
      image_1: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT6-cixmOIS5Bv0z1-0bwqAlskjnOe7E4E4mzYvbVd8m3nwxj_W3jZMd5DnaYfTljKr9-eHnfJkLrrNyLe3QAz9ZXAJg7cRvDwZP0k-AIlWMgzOk5_facKy6xtY",
      image_2: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS7rs8Fj1A1x0lkp8IHAQ7YF6AhtNNLOGBA4pAhWc7IJpuMFbT-YmuoWV8z7X3teXDwvZafMMKPhTnqP-28hzT-ErPkXQAWzF-EGYXMvxY641seA-63xLZZRYA",
      rating: 4.7,
      reviews: 1580,
      lastMonthSales: 430,
      trending: true,
      description: [
        "Track steps, heart rate and calories burned.",
        "Water resistant design for workouts.",
        "Smart notifications for calls and messages."
      ]
    },
    {
      id: 5,
      title: "Minimalist Desk Lamp",
      price: 24.99,
      category: "home",
      image: "https://m.media-amazon.com/images/I/31TC6Ef-38L._SY445_SX342_QL70_FMwebp_.jpg",
      image_1: "https://m.media-amazon.com/images/I/619QU1Q3zUL._SL1500_.jpg",
      image_2: "https://m.media-amazon.com/images/I/71OY6HtDEnL._SL1500_.jpg",
      rating: 4.3,
      reviews: 340,
      lastMonthSales: 120,
      trending: false,
      description: [
        "Adjustable brightness LED desk lamp.",
        "Modern minimal design for workspace.",
        "Energy efficient lighting with long lifespan."
      ]
    },
    {
      id: 6,
      title: "Laptop Travel Backpack",
      price: 39.99,
      category: "fashion",
      image: "https://eumeworld.com/cdn/shop/files/Artboard_37_948bf55b-b50f-471b-bf5f-a46caadc8d44.jpg?v=1770361416&width=2048",
      image_1: "https://eumeworld.com/cdn/shop/files/2_f2d8eb62-350b-4c8f-850b-d4dd9f48bf48.jpg?v=1770361416&width=2048",
      image_2: "https://eumeworld.com/cdn/shop/files/8_d689121b-0a18-4a22-a057-a3414de34356.jpg?v=1770361416&width=2048",
      rating: 4.5,
      reviews: 720,
      lastMonthSales: 260,
      trending: true,
      description: [
        "Padded laptop compartment with shock protection.",
        "Multiple pockets for organized storage.",
        "Comfortable straps for travel and daily commute."
      ]
    },
    {
      id: 7,
      title: "Ceramic Coffee Mug",
      price: 12.99,
      category: "home",
      image: "https://thomasgoode.in/cdn/shop/files/1_85ca8bf0-3e42-40ff-acaf-480496f06138.jpg?v=1754916316&width=3000",
      image_1: "https://thomasgoode.in/cdn/shop/files/2_5f5557c8-965a-4bef-84f3-12c25094b355.jpg?v=1754916316&width=3000",
      image_2: "https://thomasgoode.in/cdn/shop/files/3_87f63dcc-5168-480c-82f7-3af0a44fe105.jpg?v=1754916316&width=3000",
      rating: 4.4,
      reviews: 410,
      lastMonthSales: 150,
      trending: false,
      description: [
        "High quality ceramic mug for coffee lovers.",
        "Comfortable grip with smooth finish.",
        "Dishwasher safe and durable design."
      ]
    },
    {
      id: 8,
      title: "Aluminum Laptop Stand",
      price: 34.99,
      category: "electronics",
      image: "https://m.media-amazon.com/images/I/51tmSHBx7PL._SY300_SX300_QL70_FMwebp_.jpg",
      image_1: "https://m.media-amazon.com/images/I/71aQyQDsvwL._SL1500_.jpg",
      image_2: "https://m.media-amazon.com/images/I/71xz8-22hrL._SL1500_.jpg",
      rating: 4.6,
      reviews: 880,
      lastMonthSales: 240,
      trending: false,
      description: [
        "Ergonomic laptop stand improves posture.",
        "Aluminum build for durability.",
        "Improves airflow to prevent overheating."
      ]
    },
    {
      id: 9,
      title: "Noise Cancelling Headphones",
      price: 129.99,
      category: "electronics",
      image: "https://m.media-amazon.com/images/I/31ElPtQTN9L._SY300_SX300_QL70_FMwebp_.jpg",
      image_1: "https://m.media-amazon.com/images/I/61MRa0+nUtL._SX522_.jpg",
      image_2: "https://m.media-amazon.com/images/I/612-Tfh2CgL._SL1500_.jpg",
      rating: 4.7,
      reviews: 1420,
      lastMonthSales: 370,
      trending: true,
      description: [
        "Active noise cancellation for immersive audio.",
        "Comfortable ear cushions for long listening sessions.",
        "High quality sound with deep bass."
      ]
    },
    {
      id: 10,
      title: "Modern Canvas Wall Art",
      price: 42.99,
      category: "home",
      image: "https://www.dekorcompany.com/cdn/shop/products/Orangetree-1_a.jpg?v=1633502966",
      image_1: "https://www.dekorcompany.com/cdn/shop/products/Orangetree-1_c.jpg?v=1633502966",
      image_2: "https://www.dekorcompany.com/cdn/shop/products/Orangetree-1_b.jpg?v=1633502966",
      rating: 4.4,
      reviews: 280,
      lastMonthSales: 90,
      trending: false,
      description: [
        "Stylish canvas art for modern interiors.",
        "High resolution printed artwork.",
        "Perfect for living room or office decoration."
      ]
    },
    {
      id: 11,
      title: "LED Digital Alarm Clock",
      price: 18.99,
      category: "home",
      image: "https://m.media-amazon.com/images/I/61Yrl84Pn-L._SL1500_.jpg",
      image_1: "https://m.media-amazon.com/images/I/71dOAj166SL._SL1500_.jpg",
      image_2: "https://m.media-amazon.com/images/I/71dOAj166SL._SL1500_.jpg",
      rating: 4.2,
      reviews: 320,
      lastMonthSales: 110,
      trending: false,
      description: [
        "Bright LED display for easy viewing.",
        "Snooze feature for better mornings.",
        "Compact bedside design."
      ]
    },
    {
      id: 12,
      title: "Reusable Water Bottle",
      price: 16.99,
      category: "sports",
      image: "https://laceupclub.com/cdn/shop/files/http___static.theiconic.com.au_p_stanley-4414-5040562-1.webp?v=1763944847&width=493",
      image_1: "https://laceupclub.com/cdn/shop/files/http___static.theiconic.com.au_p_stanley-4423-5040562-2.webp?v=1763944847&width=493",
      image_2: "https://laceupclub.com/cdn/shop/files/http___static.theiconic.com.au_p_stanley-4420-5040562-4.webp?v=1763944847&width=493",
      rating: 4.5,
      reviews: 540,
      lastMonthSales: 220,
      trending: true,
      description: [
        "BPA free eco friendly bottle.",
        "Leak proof lid for safe travel.",
        "Ideal for gym and outdoor use."
      ]
    },
    {
      id: 13,
      title: "Travel Coffee Mug",
      price: 22.99,
      category: "home",
      image: "https://m.media-amazon.com/images/I/61EIySJN6lL._SL1500_.jpg",
      image_1: "https://m.media-amazon.com/images/I/61ykEJftQnL._SL1024_.jpg",
      image_2: "https://m.media-amazon.com/images/I/616+KlaugxL._SL1000_.jpg",
      rating: 4.6,
      reviews: 460,
      lastMonthSales: 160,
      trending: false,
      description: [
        "Thermal insulation keeps drinks hot.",
        "Spill resistant lid design.",
        "Perfect for commuting and travel."
      ]
    },
    {
      id: 14,
      title: "Wireless Ergonomic Mouse",
      price: 19.99,
      category: "electronics",
      image: "https://m.media-amazon.com/images/I/31rjGrfbDFL._SY300_SX300_QL70_FMwebp_.jpg",
      image_1: "https://m.media-amazon.com/images/I/810kUHKSunL._SL1500_.jpg",
      image_2: "https://m.media-amazon.com/images/I/71KuXWI0KZL._SL1500_.jpg",
      rating: 4.5,
      reviews: 790,
      lastMonthSales: 270,
      trending: false,
      description: [
        "Comfortable ergonomic design.",
        "Stable wireless connectivity.",
        "Silent click technology."
      ]
    },
    {
      id: 15,
      title: "Personal Development Notebook",
      price: 9.99,
      category: "books",
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRTtfNufAKEw8Zl1VwNep02JS9EvVLFrxOzcHddhw7vkd6w3UXXpDQJCInuOqnyc0ZKncZQXvrPezIz6jrfRtNio4qwW4sWeu8-ZoujKl5vjVZNJgvDaPie",
      image_1: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQhAF_w2OfCh1C4rv9gFhD5rurvm-t0Qsvx5apsQ5nWe6F4ckyFjqGExzo0Qv3V74B3Gb94ttgycdwr60QbO8UtkjRmmI1pG9evQT-l2Br3_7JBkiYA-4S_gQ",
      image_2: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ2tKSrwydkwcljotnHuhYUw9vuVj_7Urh2HbGn3OfOqRFRhGJXVc9SeJRgOy1YeabY9VYZNSfZ_JbA5wsRRqbzHKyXRGlGNvoFrJa0-K2bKw5WC0hjNG0zfQ",
      rating: 4.3,
      reviews: 210,
      lastMonthSales: 80,
      trending: false,
      description: [
        "Premium quality paper.",
        "Perfect for journaling.",
        "Minimal design layout."
      ]
    },
    {
      id: 16,
      title: "Thermal Stainless Bottle",
      price: 21.99,
      category: "sports",
      image: "https://cdn.mohd.it/cache/image/format=webp/media/catalog/product/s/k/sky-water-bottle-stainless-steel.jpg",
      image_1: "https://cdn.mohd.it/cache/image/format=webp/media/catalog/product/s/k/sky-water-bottle-acciaio.jpg",
      image_2: "https://cdn.mohd.it/cache/image/format=webp/media/catalog/product/s/k/sky-water-bottle-acciaiojpg.jpg",
      rating: 4.6,
      reviews: 410,
      lastMonthSales: 140,
      trending: false,
      description: [
        "Double wall insulation.",
        "Durable stainless steel body.",
        "Maintains hot or cold temperature."
      ]
    },
    {
      id: 17,
      title: "Yoga Exercise Mat",
      price: 29.99,
      category: "sports",
      image: "https://m.media-amazon.com/images/I/611HCqROj0L._SL1080_.jpg",
      image_1: "https://m.media-amazon.com/images/I/71bKsC9C4SL._SL1080_.jpg",
      image_2: "https://m.media-amazon.com/images/I/61CzyqVS3GL._SL1080_.jpg",
      rating: 4.7,
      reviews: 630,
      lastMonthSales: 260,
      trending: true,
      description: [
        "Non slip surface grip.",
        "High density cushioning.",
        "Perfect for yoga and workouts."
      ]
    },
    {
      id: 18,
      title: "Soft Cotton Blanket",
      price: 34.99,
      category: "home",
      image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRRCr1J4dfie44MWt_DS91MobxNioi6QJ-MTCt7QMPFOJkDC83vmTuiRnS7Ih2rfmLwe02TMj3qivatNCAuZtU1cYoYp7jV6jd8aetd75oTnV0BaobcwOAZ",
      image_1: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRtyeHSYJzpRW1CbCKE3zQLngLV8hBYFkcCoYaCKeUwYHN092KlXP7ogETZY4j8c-5Y8XwSKdK_WTJNViSEcS9cku8Pn0rgCGzchRRsaCPQWCWn7VKI30sA5Q",
      image_2: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRtyeHSYJzpRW1CbCKE3zQLngLV8hBYFkcCoYaCKeUwYHN092KlXP7ogETZY4j8c-5Y8XwSKdK_WTJNViSEcS9cku8Pn0rgCGzchRRsaCPQWCWn7VKI30sA5Q",
      rating: 4.5,
      reviews: 380,
      lastMonthSales: 120,
      trending: false,
      description: [
        "Soft breathable cotton fabric.",
        "Comfortable lightweight design.",
        "Ideal for sofa or bed."
      ]
    },
    {
      id: 19,
      title: "Slim Leather Wallet",
      price: 19.99,
      category: "fashion",
      image: "https://eumeworld.com/cdn/shop/files/NOVA-CARDHOLDER-RUSTIC-BROWN-1.jpg?v=1740401777&width=990",
      image_1: "https://eumeworld.com/cdn/shop/files/EUME01627.jpg?v=1740401777&width=2048",
      image_2: "https://eumeworld.com/cdn/shop/files/NOVA-CARDHOLDER-RUSTIC-BROWN-2.jpg?v=1740401777&width=2048",
      rating: 4.6,
      reviews: 510,
      lastMonthSales: 190,
      trending: false,
      description: [
        "Slim minimalist design.",
        "Multiple card slots.",
        "Premium leather material."
      ]
    },
    {
      id: 20,
      title: "Indoor Desk Plant",
      price: 15.99,
      category: "home",
      image: "https://cdn.shopify.com/s/files/1/0775/5287/7809/files/00608401_thematic-jpg.webp?v=1770794609",
      image_1: "https://cdn.shopify.com/s/files/1/0775/5287/7809/files/00608401_01.webp?v=1770794609",
      image_2: "https://cdn.shopify.com/s/files/1/0775/5287/7809/files/00608401_01.webp?v=1770794609",
      rating: 4.4,
      reviews: 290,
      lastMonthSales: 130,
      trending: false,
      description: [
        "Low maintenance plant.",
        "Enhances workspace decor.",
        "Natural indoor greenery."
      ]
    },
    {
      id: 21,
      title: "Mechanical RGB Keyboard",
      price: 74.99,
      category: "electronics",
      image: "https://kreo-tech.com/cdn/shop/files/Frame_1000007102.png?v=1771248201&width=1000",
      image_1: "https://kreo-tech.com/cdn/shop/files/Frame_1000007102.png?v=1771248201&width=1000",
      image_2: "https://kreo-tech.com/cdn/shop/files/Frame_1000006957.png?v=1771248201&width=1000",
      rating: 4.7,
      reviews: 1100,
      lastMonthSales: 300,
      trending: true,
      description: [
        "Mechanical tactile switches.",
        "Customizable RGB lighting.",
        "Perfect for gaming setups."
      ]
    },
    {
      id: 22,
      title: "Gaming Mouse Pad XL",
      price: 17.99,
      category: "electronics",
      image: "https://image.benq.com/is/image/benqco/g-sr-se-2022-rouge-03-1?$ResponsivePreset$&fmt=png-alpha",
      image_1: "https://image.benq.com/is/image/benqco/g-sr-se-2022-rouge-02-1?$ResponsivePreset$&fmt=png-alpha",
      image_2: "https://image.benq.com/is/image/benqco/G-SR-SE-ZC05--_01?$ResponsivePreset$&fmt=png-alpha",
      rating: 4.5,
      reviews: 430,
      lastMonthSales: 170,
      trending: false,
      description: [
        "Large surface gaming pad.",
        "Anti slip rubber base.",
        "Improves mouse accuracy."
      ]
    },
    {
      id: 23,
      title: "Fast USB-C Charger",
      price: 24.99,
      category: "electronics",
      image: "https://www.capesindia.com/cdn/shop/files/cable_hero_shot.jpg?v=1768291529&width=800",
      image_1: "https://www.capesindia.com/cdn/shop/files/4in1_macbook_charging_93670abc-7f89-4a71-b668-999ced77d17a.jpg?v=1768291529&width=800",
      image_2: "https://www.capesindia.com/cdn/shop/files/4in1_e-marker_chip.jpg?v=1768291529&width=800",
      rating: 4.4,
      reviews: 540,
      lastMonthSales: 200,
      trending: false,
      description: [
        "Fast charging technology.",
        "Compact travel design.",
        "Compatible with multiple devices."
      ]
    },
    {
      id: 24,
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
      description: [
        "Organizes desk accessories.",
        "Premium wooden finish.",
        "Compact modern design."
      ]
    },
    {
      id: 25,
      title: "Adjustable Phone Stand",
      price: 11.99,
      category: "electronics",
      image: "https://chemistors.com/cdn/shop/files/1_9fb8e9a2-7d6d-4102-b205-686d8890d037.jpg?v=1744281785&width=1000",
      image_1: "https://chemistors.com/cdn/shop/files/4_1452ae6c-26c4-4058-9afd-20f7a4f76f02.jpg?v=1744284349&width=1000",
      image_2: "https://chemistors.com/cdn/shop/files/8_f07ac886-128b-4d52-8fe6-8a5b5564b24a.jpg?v=1744284349&width=1000",
      rating: 4.4,
      reviews: 380,
      lastMonthSales: 140,
      trending: false,
      description: [
        "Adjustable viewing angle.",
        "Foldable portable design.",
        "Ideal for desk usage."
      ]
    },
  ];
  
  export default products;