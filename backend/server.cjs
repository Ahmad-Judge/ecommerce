const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/product.model.cjs");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const multer = require("multer");
const ProductModel = require("./models/product.model.cjs");
const CategoryModel = require("./models/category.model.cjs");
const Order = require("./models/order.model.cjs");
const User = require("./models/user.models.cjs");

const { storage } = require("./config/cloudinary.config.cjs");

const authRoutes = require("./routes/auth.router.cjs");
const { isAuthenticated } = require("./middleware/auth.cjs");

const app = express();
const PORT = process.env.PORT || 5000;
const session = require('express-session');
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 },
  })
);


// 🔄 Enable CORS for React Frontend
const allowedOrigins = [process.env.CLIENT_URL];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));


// 🛠 Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// 📂 Routes (API Endpoints)
app.use(authRoutes);
app.use("/api/auth", authRoutes);
app.use("/", require("./admin/router/products.router.cjs"));
const cartrouter = require("./admin/router/cart.router.cjs");
const orderrouter = require("./admin/router/orders.router.cjs");
const loginrouter = require("./routes/auth.router.cjs");


// 🏠 API Home Route (Test)
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API!" });
});
const categoryRoutes = require("./routes/admin/category.router.cjs"); 
app.use("/api/categories", categoryRoutes);
app.use(cartrouter);
app.use(orderrouter);
app.use("/auth", loginrouter);
// 🛍 Fetch Products for React
app.get("/api/products", async (req, res) => {
  try {
    let products = await ProductModel.find().populate("category");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});
const upload = multer({ storage: storage });


// 🔗 Database Connection

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Connected to the database.");
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
  });

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
