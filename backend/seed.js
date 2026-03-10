const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const productsData = [
  {
    title: "Wireless Noise Cancelling Earbuds",
    price: 39.99,
    category: "electronics",
    image: "https://images.samsung.com/is/image/samsung/p6pim/in/sm-r530nzaainu/gallery/in-galaxy-buds3-r530-sm-r530nzaainu-546681234?$Q90_1920_1280_F_PNG$",
    image_1: "https://images.samsung.com/is/image/samsung/p6pim/in/sm-r530nzaainu/gallery/in-galaxy-buds3-r530-sm-r530nzaainu-545178122?$Q90_1368_1094_F_JPG$",
    image_2: "https://images.samsung.com/is/image/samsung/p6pim/in/sm-r530nzaainu/gallery/in-galaxy-buds3-r530-sm-r530nzaainu-545479795?$Q90_1368_1094_F_JPG$",
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
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRNVjy0Ci6YJR9T80IRJ2poLEWDn_-cRmtx8HuFaL98HkPIfSZKmk72PoXhU2Ymcl13f5oHHFn1FhAVbQjCtA0nDcTagsER",
    image_1: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ7c3sWwR0FAFeEdEis1CxFyhpoygpnDUDGT4lZg5o-rsW14E4GzZfp1XKxusLdK9LDA57aP6HLG12jvTKcgBWF7TANmkOu9A",
    image_2: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ7c3sWwR0FAFeEdEis1CxFyhpoygpnDUDGT4lZg5o-rsW14E4GzZfp1XKxusLdK9LDA57aP6HLG12jvTKcgBWF7TANmkOu9A",
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
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTbRjfFWADaHRsVACKhWEirPeZ3n19uCZWWNMezYXU2ezG5UjP5cDZeYmCf15rUFEFy2yH5tYIyLAIH6XNNpIK5zaTyJF8HWp48jp6RE0sUegBGJOS990St-A",
    image_1: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQDsLrgMbWRjMbaw6cMS3hW1I42SjG4zNCnAYtto9KVWd9EpJx5EKw5vP8tR9ENW0hWlKnnfDmjPALuqrxzfbsjMrkKF3UHZHBTCwnT3mo",
    image_2: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQtVlOw04NUCYrFoe4s5eJLCYuG_fg6ckbBHBvSHQvMJ36MDNM_sTVPsQdxW-sqIOhM7W5-6No7uDOd3IHBQxuJyFFMaXW_6zaSwynsvnkseze4gFHocPa1Jic",
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
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ8qC90r6zXB9_z-Xf5VN571MqWJmvgHKM_il2PYSalx7YQZjRgLGrp0qA2nd2u_MxLBUuAsLDGfK0p67uJawI_3K5F438H3ySvXdrTV42YgxYhrOdzwU7hj-uf",
    image_1: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT6-cixmOIS5Bv0z1-0bwqAlskjnOe7E4E4mzYvbVd8m3nwxj_W3jZMd5DnaYfTljKr9-eHnfJkLrrNyLe3QAz9ZXAJg7cRvDwZP0k-AIlWMgzOk5_facKy6xtY",
    image_2: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS7rs8Fj1A1x0lkp8IHAQ7YF6AhtNNLOGBA4pAhWc7IJpuMFbT-YmuoWV8z7X3teXDwvZafMMKPhTnqP-28hzT-ErPkXQAWzF-EGYXMvxY641seA-63xLZZRYA",
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
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS7rs8Fj1A1x0lkp8IHAQ7YF6AhtNNLOGBA4pAhWc7IJpuMFbT-YmuoWV8z7X3teXDwvZafMMKPhTnqP-28hzT-ErPkXQAWzF-EGYXMvxY641seA-63xLZZRYA",
    image_1: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS7rs8Fj1A1x0lkp8IHAQ7YF6AhtNNLOGBA4pAhWc7IJpuMFbT-YmuoWV8z7X3teXDwvZafMMKPhTnqP-28hzT-ErPkXQAWzF-EGYXMvxY641seA-63xLZZRYA",
    image_2: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRdz5EMT-3PDY-TOqsd8jDrCxnehGCRqYkyT9fbfJbLc2Q_e1h4GPPPaSIG6g9_uyPA17NPORM27cXO6vTSb-_BeEoRCCwsIsyE8suKW2E",
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
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSUQnptoblJDT2a3a_927Jh22r7wWkH9axpkwCZuLkcpKOjo6E5W0Q5sJHFxvHV4ymMk3id5dib9qU0AziOK4-fJJ0VihsTkBgcd3x0f9fC2VIONsKY-eV573U",
    image_1: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQNwgFG1PLipPZUul7-zvDWxRJJbZU8IB5HuEAaEGckOu_lLXujhvfWmNzFDimzZXh6AavS_V_JaQuB_DZjZCvHEehKEzPUfulv16tkP2PPxxkZxCHEpNPzTw",
    image_2: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQNwgFG1PLipPZUul7-zvDWxRJJbZU8IB5HuEAaEGckOu_lLXujhvfWmNzFDimzZXh6AavS_V_JaQuB_DZjZCvHEehKEzPUfulv16tkP2PPxxkZxCHEpNPzTw",
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
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSUQnptoblJDT2a3a_927Jh22r7wWkH9axpkwCZuLkcpKOjo6E5W0Q5sJHFxvHV4ymMk3id5dib9qU0AziOK4-fJJ0VihsTkBgcd3x0f9fC2VIONsKY-eV573U",
    image_1: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRnaeMpaD2g1Coj5dgyqfeFhfd-XR2FUbTQYukMA_vAFAeGGbhLl1BN6OwBbS_EjR_71iAqf8uv0lrs9e2hLbQtXEKvSTogSEMWeoLnHwaIAafq4AcvYKnv6UQ",
    image_2: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRnaeMpaD2g1Coj5dgyqfeFhfd-XR2FUbTQYukMA_vAFAeGGbhLl1BN6OwBbS_EjR_71iAqf8uv0lrs9e2hLbQtXEKvSTogSEMWeoLnHwaIAafq4AcvYKnv6UQ",
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
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQaVvzjBFarRKTx0adSi-bjgFPvNyTN-H1xl4P4XngirlXGx6c0Y6nLWx7a9XF_hJFfTrQTh8gdiyuR3uyJxWytlsWj2_yS",
    image_1: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQsF7GBFLQyYR07ZQ0CdwKp6sl3RgjIPSqTiX4CioMP8FA9khHG1e4GI9n5bFbm8JKiBNCkqe5yjiMYWZYXinRZCrVAMvRhkaGr4BdL-NSlWY-DbMZqrcMZ",
    image_2: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ7LhXiZnMl2XkL9j954HoU7FpudgREi-0XoEoTQIZN1M_3P5mHHhsHH3VUmVlKJGrRTqL2J9sbU2-VLkc1HLyJkDlNJsTWww2t60aU3p1vDSrGzowgyXvEoA",
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
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ7LhXiZnMl2XkL9j954HoU7FpudgREi-0XoEoTQIZN1M_3P5mHHhsHH3VUmVlKJGrRTqL2J9sbU2-VLkc1HLyJkDlNJsTWww2t60aU3p1vDSrGzowgyXvEoA",
    image_1: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ7LhXiZnMl2XkL9j954HoU7FpudgREi-0XoEoTQIZN1M_3P5mHHhsHH3VUmVlKJGrRTqL2J9sbU2-VLkc1HLyJkDlNJsTWww2t60aU3p1vDSrGzowgyXvEoA",
    image_2: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTf89NgBirvY5tecO15BmAFbj6d10RvDOhW_Tms53Kz6QaJ1WdBBeVMhvE2m9YFTboUTv3pAM21323lzdpjTzFPDpHDGAccR99U5cqvCgw",
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
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTf89NgBirvY5tecO15BmAFbj6d10RvDOhW_Tms53Kz6QaJ1WdBBeVMhvE2m9YFTboUTv3pAM21323lzdpjTzFPDpHDGAccR99U5cqvCgw",
    image_1: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTyvHSKF0FuZJNwLsKuKO4dIm9Cc2MvDEIIZpoOU4J01zwF_QFDEWrTHB16PehgwGCsUKhd2JBU7mk7dX2mFNd5R_Rd--jJmNY9p9tHoZuZeAldXS87BA3pLug",
    image_2: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTyvHSKF0FuZJNwLsKuKO4dIm9Cc2MvDEIIZpoOU4J01zwF_QFDEWrTHB16PehgwGCsUKhd2JBU7mk7dX2mFNd5R_Rd--jJmNY9p9tHoZuZeAldXS87BA3pLug",
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
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR_DwulERaqdD7WmqP9IEVuKL1H6OJlY5c3xIKSK4znLYc3xfII8tFHavc42Bhgva61kgjiU7JVkVye0GsVr0B4eBAe34ZCR3f4Uixrt4sF-9kRcJNMd4qCrw",
    image_1: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR9j-tioPl8XYitMLjshSkMgVVYYONQyJe2Dy46bbZtGlr4YucRpxLWoXERa_WAypEO2lL0jQrl-1gChScLPMMPFnzv9CsNf2en61Y8LkRM9p391uJV_KGoYA",
    image_2: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTyvHSKF0FuZJNwLsKuKO4dIm9Cc2MvDEIIZpoOU4J01zwF_QFDEWrTHB16PehgwGCsUKhd2JBU7mk7dX2mFNd5R_Rd--jJmNY9p9tHoZuZeAldXS87BA3pLug",
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
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR_DwulERaqdD7WmqP9IEVuKL1H6OJlY5c3xIKSK4znLYc3xfII8tFHavc42Bhgva61kgjiU7JVkVye0GsVr0B4eBAe34ZCR3f4Uixrt4sF-9kRcJNMd4qCrw",
    image_1: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSEL0braIx2RSMuxx2pUHBXIBxFCAP1Ii18s5pdGyp0S2j89RMufF4nrnFxtuOr4fafLmcjnjqsnUBYp-EklUbUOFR1tof9IGZBDeVnjanmaxFqD9YrHtSd",
    image_2: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTqJoM2MX25Xl0qmU6rY-Wwny0SdlniDOzkU93SzjVGs14vy_nakPfIH-pPHO9mRyCkJV5Kx1V8wxwvYccaocbqTp1pTHl25yIBAXrn9uW-9whARYJ7njEOJNs",
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
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ-x1_4YFxox1w9ajrtu2l-ozpxUo0_p5LChDJBFemyzQUkWiDbyLcqG5UCFLDd9xAWhkC6tyD-tg5XTv0PACKRsradDz81A6fGC-6HWMT82Z6mQV1OQfS8IYE",
    image_1: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRaUuU1smWMVbt0Wl-ogHRf8v8aVkdb8BXksz31QzDT_jZPiLyy40SlWMCJCbLjGmsEAP9q_kg_mJbSM1E4BLZV5CoR0Lo6EzIyUxCVLRtvL_m04faeEc3y",
    image_2: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ8KdOR2Eo3h6LZXRavTa_RUIrAhJKjAO7t-C8k4nfxqXck1odQeeiXWerpqwIb0eaCWP_svdSiyBRdNofp1jni9CItVpUK",
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
    image: "http://rukmini1.flixcart.com/image/1500/1500/l3khsi80/mouse/2/p/y/toad-23-adjustable-dpi-2-4ghz-portronics-original-imagenxwusxc5sgb.jpeg?q=70",
    image_1: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQPJSBXsprgUuIKOUAi-c5o5VJ7T8WkOEKn_W1faswlUzOrHvz21DQE1Bojiqt_VJBizc1OgDRUiThVeuvqzqbBOgeWp4BVirenPixJekFxLki3YFWJ98WZ",
    image_2: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTHGuFpApShY9rIRpEK1egXWgb_xO1X2-FAxg15WMVUjGthUGeeeF5mrB52Di613kpnzci09VU8hGCJVBPyq_UFoUcP9M2yi8wvR3xfAmrANc5VuXOrR90WkQ",
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
    image:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTup9F1dMlwcan-9vaX_tB8aZSJp4X9N9QN5aUqlyV1W6e6afItnGby34iGL-ZL305Tzm0yyo_zhumDDCKdNrP2EqHg0RnrKiNlNPVKtOyHLpJ8FuCWfTwf",
    image_1:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSWS0XsEFJl-mZGmZex4MHYVn1AH7hRDdxGslYzWUKnpmjpQ0HHmtUASd0em-fC-n32m-ajSZyeNcDLYzW8HC3Gbu5LckdOEZ_JETlsngr229vZa0nLm9IL",
    image_2:"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRaGS9gJ5rLVwsH4vR43fq3-hhjR_0KJQCfjYgBB3IMktwDeGE1PmDvovE6h5djA-EdvK518Cz5Sh3QP8Q6ZGxSIBrv0Kql3wA20CbfkFE2jwoHu06OdRU_eQ",
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
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTVpVvqszhi8WdMTUApLb-LpNZ9qp3RrmJnIPXoIY5k1AeA-W1zPrcWNrFBq6oe8prdyBZNwi7czIVBDsBVhwrhot3eC0g6w0rU-unGJU5HK0TxTYNdbmcnIpQ",
    image_1: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTRPnhEECG1G4C3DoTeEWN_OGJjZrn9K_1J7ppWI__p7Djh98RkuVQVxigTz8re5RPGj2ApeMmHhtjXaa7NGkJe_C4hhYOBptPqN4BvJe6hwrzI8Lb-t8ol8IU",
    image_2: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQV--iG3BakOBGn6Lin6mSDjzwCnIFFWwl12g13cFvxggjjXGWbalYOEpBS3Gw0gJY0XN0ehE2UowEU9rh7LdA3V7UptOeAMTvyKDxKAjU",
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
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRDIwJ5Ak3vbLgFmu8Vf_YkWwukhSQeIdGDWaVHqYh_YwCoxfi6Jx3Hm4mUlTSaxEAKp4XF-6v7QL-TK7hgiTFaShw1Xa3wsqycKGzStc6yuVwsVqd12VAl",
    image_1: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRDIwJ5Ak3vbLgFmu8Vf_YkWwukhSQeIdGDWaVHqYh_YwCoxfi6Jx3Hm4mUlTSaxEAKp4XF-6v7QL-TK7hgiTFaShw1Xa3wsqycKGzStc6yuVwsVqd12VAl",
    image_2: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQV--iG3BakOBGn6Lin6mSDjzwCnIFFWwl12g13cFvxggjjXGWbalYOEpBS3Gw0gJY0XN0ehE2UowEU9rh7LdA3V7UptOeAMTvyKDxKAjU",
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
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRutoce-ZFeu3LZbHyJBmZxH_NuSemMoUWPKsj9AyZBVFW2KVNJOw44DYd8Iqk99xReYPqTBwaATsbD1A9TackZpBrtBM9DR11gx8SVgD8",
    image_1: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQiHFJPQ9WI6b4G7lyFDDgy2hhAf4tWxIKGuROgbLsrWcwETOb-B8NxdUqflT50X69Vu-Ichrn-zJYxGpfFFwoGpmNq4tpoYwvF46AOU9fagwZfEvCKKuhYKA",
    image_2: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRmUNJ8iJO_57vENoNKLzAt9UjMlntHNJ-dJOJSBbHFnRdjiF-Cjvc4Xzr2Yjn2yonwtvV7cnXK3bBgSbfVCfN8pB7yMaMmFODyBq8VY688iLiEVsDnSaj3DHI",
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
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT4PwuyjuOgnzrAUZKusW8_eydwsdCs4kkdv-l918f4Uou2CdeyUA5kIfY_TKj-r_hRdmFjuLACjVn8Th2h7UWRuZhzEUzSCVJZ6RIiwWdDYDcIIh6vkHKweg",
    image_1: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR4yE-CawD3FlVWx-b-XXxUyzy2V563sYnjWm6RBL5YRCLHVAaG3w3cAkjsGJ1Yypd4RTxYU0FuEg0zs9-0MEe5z6DmW1006fwfRaHwoLluf_qS6eV_fJu_",
    image_2: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSLIBOXmKk5jDTnciWuX5lT_4GAa9pk3Rw5rwpy5bhXY4rQ1bbXpLImCxzFkO1klWsTAfgPsK_lSVhPouiZe7EfGY87ddym_DdG0Guy2ZocOyKECptM6jSZeA",
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
    image: "https://m.media-amazon.com/images/I/61BIBUtgYcL._AC_UF1000,1000_QL80_.jpg",
    image_1: "https://m.media-amazon.com/images/I/61-5B9xEtFL.jpg",
    image_2: "https://m.media-amazon.com/images/I/71b8T0rjbYL.jpg",
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
    image: "https://m.media-amazon.com/images/I/71b8T0rjbYL.jpg",
    image_1: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTCnQkok13Bmw5Xx4pRAvh9Wb7jy0Sh7B8U4W_jnnFssiqCYfvl4VD1BTfaL-TNI-Gepf_JHZbmLkBENAlIFLWf3Z_07MFbKCjswSWYJ7RVzHpeIXtK_U8F0mE",
    image_2: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS5brAQ8WZM8ep-YjjJF0Xn8bqTGTxZnh4nnEnCkeM29XcJ6HrkMNC_s4L2SEBD7GjCAapIkjTbYCOdhV4QgPT5KnsyUdsRJ1WEZECD3OM",
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
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS5brAQ8WZM8ep-YjjJF0Xn8bqTGTxZnh4nnEnCkeM29XcJ6HrkMNC_s4L2SEBD7GjCAapIkjTbYCOdhV4QgPT5KnsyUdsRJ1WEZECD3OM",
    image_1: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ8YQUY9W2vkJWqMpS9Lor3C-HD5KXTkj6VeQV3SBTGePWHxF5Ci7Wijs-UaiJxCfVWyP9_115R9zBYz7EDoSgXNKhJP6n5IV00LJWf-xghOmLRBwZJiNUSUQ",
    image_2: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTDkNWhGs3d4TyrE4LmV14Luu9d_jWtER7wcxupz5KTP9pUQTf9NesZjQYbh8v98wTtklkmqXHYOAf40Q-3WZ9X65_SIvIgqQ",
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
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTDkNWhGs3d4TyrE4LmV14Luu9d_jWtER7wcxupz5KTP9pUQTf9NesZjQYbh8v98wTtklkmqXHYOAf40Q-3WZ9X65_SIvIgqQ",
    image_1: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRph-F2VPvsmQt4x7vhzaGDG2C2CYnOWUN0tVi-a3NLmWXe-zSW0NY9Ba7ysWk99cEGkCIddZJbBobdUr7BnmYpNyLgew9VJpiSoLQ7TIXU-0hbs89ItkXDJQ",
    image_2: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRAj2zCjmVjciCypeMXduMLUs0Oy2pPu0oKM8fn3Le3Sz3Dm6OfoFDPi8EcVjcd2hzEFOnthmad2eUCLTGcoYw5XBjdE4L1ai5NWfzcCl3I76wtLl7qvDbJVA",
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
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRAj2zCjmVjciCypeMXduMLUs0Oy2pPu0oKM8fn3Le3Sz3Dm6OfoFDPi8EcVjcd2hzEFOnthmad2eUCLTGcoYw5XBjdE4L1ai5NWfzcCl3I76wtLl7qvDbJVA",
    image_1: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQuVV3CKRXTbj_SJ_zdTANsJCvI-I__i9iDOmLRxyRbtT4bMqhw_F9MX9B4oX-gJGdTTtVQoGnafVgpMMWKIkoL8VJT0g6fsw",
    image_2: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQf18OJrLCOr1EhuTOAmVyrdH1oq680KFiOELGxDdjfmSjsCY7EjFdVZR_U90ATazZbZ55TJJPQNs6Kd1qB1ETpRv1BJNZePTqeKDbnC-c",
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
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQf18OJrLCOr1EhuTOAmVyrdH1oq680KFiOELGxDdjfmSjsCY7EjFdVZR_U90ATazZbZ55TJJPQNs6Kd1qB1ETpRv1BJNZePTqeKDbnC-c",
    image_1: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQJwPB0I6vhS35Zd8fnBgpMmShDVNd9B8v8vUXYRA7YW8FcOGgIkJix1ZtGxv_hkrs26Hh8QzUUxpaUOHpkO1CWlN_5mXJclg",
    image_2: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQL_l7IKKSZg9XzoqkDKlslgMLEJKr4fM14u0ZrHDUXON84TxYJcIiberwEuI8fyTlkQd0sHO0_7guXHEKCPXyT1ScnotSGXdmK14_qIkElVYbrOZXe_A",
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
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTVpVvqszhi8WdMTUApLb-LpNZ9qp3RrmJnIPXoIY5k1AeA-W1zPrcWNrFBq6oe8prdyBZNwi7czIVBDsBVhwrhot3eC0g6w0rU-unGJU5HK0TxTYNdbmcnIpQ",
    image_1: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRNFShDXaH4bmCAIntrpeSfmyI4oVH8m5YZnKL4tOXL9zqL8LccWxkJqZ7uwzkg2cmqTXZMVKxqFyU3jYlkMpets1_Tj23mLHcaWhfKiic",
    image_2: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQZGjDHKdUIk7-lnOSBFGEY0BGy1nDSjZe6n0ftqTMUebGCuLC5PH5K0NnLTQjI3x-EWhEHL-pa3X7AGKEwROWARzyx732izCR6MwvoPaU",
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
    image: "https://m.media-amazon.com/images/I/51pBEl7MYmL.jpg",
    image_1: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSk5d8ykITVJyQaCu8QF5ZbgT9LA8LvvYLdPMvSqmucEP70aDPf_C_sRQD_a-69rRrcpxbTEeAeYtog6T0vyxlT06yXFsZkqgDf5czslsfisTDhrHmMzCStkw",
    image_2: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS2-feaH9dArDDCL3f7Y1GsSiHi5Xg8t2Nq_qyb2LMO5tzdkXw938h7N6FA7mqBVDEUfhqZBmf3Mv03yU4bq9Evi_3R7stZ05qM-c2OJQKmVeZmrPojRC0Qvx8",
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
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRXC2ALgR6rK5eJaZ4Mi_os6h_7lFD9XAcx4_ltkWfVPLNpcSpC-2WV-AeGWY7q2TNEvdF4OwUfv0l6zqQ8OD3eBoV9yzJjIg",
    image_1: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSb5ukZqoJTpQSqs8OrAlZM4r-5HPgafC7egtp_7kD4ypM0LcttQCsknbamw7cJtI2I6RLbTPaqtjMQQ40HOtuO_PKrhB-X",
    image_2: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRhQApj78Qv8Ebx6Ss7KmzGG4nI6_nxeviYAvUre6RIonlpUiaWR3k9yWmgsMI6VyuHbW7HZQ7CkHDEfxjMopoyjc8UxlyH",
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
    image: "https://m.media-amazon.com/images/I/71ZZ0fPkDIL.jpg",
    image_1: "https://m.media-amazon.com/images/I/81ML2pdr23L.jpg",
    image_2: "https://m.media-amazon.com/images/I/81DKUd2FKgL.jpg",
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
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQrA6yZQXjI1xbuEKiDfDpJxCQtB39reUyjqCRhi4a0pu8eTUnF2T5YjTMYOUpVqXwc33GZC7aLOZA5mCPMLPgzPHjewGrU-nRP8BBTAMsVBpriFZjqf_-q",
    image_1: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQsu92ZuO9Y_MWv2owSDA0j9h5c-SSg1WFXi_07oKghI3cn7-Tk-sgMTJCtjRFfbPxWMb7Ofmmh5rN1FofN-1MW9xAtyl5lQw",
    image_2: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSQo5ZERm-LX6o6p0l_SfRFYC3zaTw4xitMR5vrVaFCulYkv_6kdNsQdm2kpVTO6nmY__N0L4cPScDyYCahJNfq33YX16yj2cvDRcKt_hYeF43uoI-6e9ki",
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
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSdC8ARDBydFBN1hrqpvys8pNc3orTu8YdiGywjiPSoQCnUahnwAmwl72tF2edR9lEVR_nZ1YjrZfTOjrLO7CrjzqAQ7Rsm",
    image_1: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQxo4Xrlqda8Ww6kL7UUv5r_9dwWcRHlMlgzXbdre_L1nhYd6oSxqaVZ9pvCM10SJn91mucFQtjTMWHaDm2yiwM2WqLcHNMU-jPSIzqVp1x6jG0zAYIQYup",
    image_2: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTO6yZdtXjFrWknr0a4rJ9jwTWrxr4HL94hBShDN3NLJSsw4VwV9XrlgOFHoiGQg2cAr5sTdRqIU2nLmfzHUkCzqYDZGkJKIw",
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
    image: "https://m.media-amazon.com/images/I/51H1F4ua5lL.jpg",
    image_1: "https://m.media-amazon.com/images/I/61JQ5XE-vxL.jpg",
    image_2: "https://m.media-amazon.com/images/I/51N49Tc5lHL.jpg",
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
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQvbycL-ZCcLR4lHHC8pPdm314a1nGd8d--MLpTqZ_UeuuBb-is4uTPfUDJy9vQ9vbwVv9ZRxYcmp9G_HAUEuv4awbBNq_Sx6dKnem17Don6nTysnzCT37V",
    image_1: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTr3vv1AMnXjons0pHrlB6CSyNGtPa37A3381jmQhRFB9tnfG6fnjxcf7Q3iR4zk1DJ0ndulKEoTTiJBmwG-qSz1pNheI0vxQe2ieB_sVfJL8Xh3qo431IS",
    image_2: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQiBvcH_lS7hNGk603LE8U08fq9_xAnrhMuRon34ytvA7yIy68AjuZsLLkAN0s_wiIjHc8I7C_TvtN4wQKIKykm7-JeqIkasqELNZ7WuhV5lB1fsqhvtB_eMQ",
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
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR16KB7yWvtPc1Rq1BRuNuuETht9olmaWvA0zr5GMmjFZGxsH5DUV2eJj2tIGXNSrcpZXfmP0WXv8kLDbfAZwMQNJiYDyCx-w",
    image_1: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSA7Pr_Cagke2bq8rrfdP2CM3d2LCg9BkMDWn8IwqMqZesS6aIsM5nw5msFkDWwD_Z8H1cWEVB6AXtdM1FLaolqKNP-PV6AWA",
    image_2: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR0y-kfzXxINiov1BS5jANhQTz9jTBP0i_3FLAN_oOZlCQ1trAMtbcSYEhBvfrI9YMt4VqtvDRObZvUbKFJAOMmbR-vRmK9",
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
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRLzQ3k2LpTTWOfxXsm_DZJSXTQkx6kth98QItmmRS6jSlfJ9MOsVRPLYF1N6ffjIrXxoKwy8zewDwXEndKsZU-aN14yYSfjsr0oLtzYZI",
    image_1: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTwkZgOWOyYMyRFThd4Kpi5M6AR9dQMdPCVhmfrBNsOux6pafKicpXSrHYYpSKdO6sFjvp9OfI4Eg6T2KX4P4j3Ir1NjkPJMo2eS4AwWYm4aAOcrU7adMsw",
    image_2: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTCsLirPcoCMlRZzM_sBwYzH4sWrRwCzUCmHvjCcf-zSGy6uVglslK61P_1kfKv3XtfNgSnAQBeo25MM3SdcvE0wAK09FPK51ZEHuVjCn0",
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
    image: "https://m.media-amazon.com/images/I/51ntoIcscZL.jpg",
    image_1: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQACZGaYCVxlT-CYJ1IlLNTpEVz_IRYfUgtVedvXs9j82qhEcFfBc0zBzUvyc6Oj0CnEDxoxQnM5wt2uWPjDQL9CH3SpmUt6rRNy44Ymm8",
    image_2: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQL2sIZpWXTy4y78DC83UQNGHQJij7MmIDc7i6sXiBOkr14stA3yAbCe4KL0m6W4LeE4Fgiryiv9jKIkFPWd6_spUgkdlCLmmQwIHr32wY",
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
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQAldB2_bJLYhuUQ7iYzp6Ffp8hGFx-5yVwIVhcWr6lqvnPajoDX4Hboah-Ujx__ACxFuvyQoizrXZDLbCdtdoQo-y7yDBS1L2WWb1Qvs_l5Z7RI2KqSGw9",
    image_1: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT02T3LYq5tzp-mNnuLtb9axHeA6JM61uwm3dF_49LMXF4nXD7QuGXtfQXD6tMx5zyxMopqfFaryTtgyvJ2nECgCM4cuUPFEhuTe4F4RWE7Qc64G-of3FY8",
    image_2: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTwrwy2ZRxDMmbnTsUxvUhhBGF_2mk1OFhOeDCVjGs8gn_3n11jitI1Rf_f8e_KdYiEgkREqtt4yOmegL13QQwRXKFa9zXx",
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
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSB1RKd9pTVjSI5ibgvJX2bnN_uIp926Pk1nKbmGIb3h_zfz-fh-GaKGjJ6rFN9Y3K_nGmO2-qxkRC6u8HkDd_HlssYQlA",
    image_1: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSSBx3SOWAuBhpetZhf2gAz9fJICan7Qzf9uzt8RtfXUr5Qjiy38kQiJXREgScHbwYPFHgHz7VXnDPR7o1AjINMcF24V8sXZk8jdOeEHO8QRlHWvdRZ2m1A",
    image_2: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSMQDFqhUI36RXbRaUCRQl1yGEXb03cjSzr9jkbIJttdqumripJ5PMeye1Yl2Y8A75TUL74Xvtwq9NRGl2eG9cNcSd27kdVLtjLY-ytVi4",
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
    image: "https://m.media-amazon.com/images/I/41DNG--PsZS.jpg",
    image_1: "https://m.media-amazon.com/images/I/518eiavidhS.jpg",
    image_2: "https://m.media-amazon.com/images/I/41Zia6EFRFS.jpg",
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
