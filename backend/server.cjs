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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Directory to store files
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  },
});
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
// app.use("/api/admin/orders", require("./routes/admin/orders.router"));
// app.use("/api/admin/categories", require("./routes/admin/category.router.cjs"));
// app.use("/api/admin/cart", require("./routes/admin/cart.router"));
// app.use("/api", require("./routes/superadmin.router"));

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
// app.post("/api/products", upload.single("file"), async (req, res) => {
//   try {
//     let newProduct = new Product({
//       ...req.body,
//       picture: req.file ? req.file.filename : null,
//       isFeatured: Boolean(req.body.isFeatured),
//     });
//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error creating product" });
//   }
// });
// app.use(categoryRoutes); // Ensure this line is present


// 🛒 Checkout API
// app.post("/api/checkout", async (req, res) => {
//   const { name, email, address, paymentMethod, cart } = req.body;

//   if (!name || !email || !address || !paymentMethod || !cart) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     // Calculate total
//     let total = 0;
//     const productIds = Object.keys(cart);
//     const products = await ProductModel.find({ _id: { $in: productIds } });

//     products.forEach((product) => {
//       total += product.price * (cart[product._id.toString()] || 1);
//     });

//     // Save order
//     const newOrder = new Order({
//       name,
//       email,
//       address,
//       paymentMethod,
//       cart,
//       total,
//       status: "Processing",
//       createdAt: new Date(),
//     });

//     await newOrder.save();
//     res.json({ message: "Order placed successfully!", order: newOrder });
//   } catch (error) {
//     res.status(500).json({ error: "Checkout failed" });
//   }
// });

// 🔑 User Signup API
// app.post("/api/signup", async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ error: "Email already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, email, password: hashedPassword });

//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: "Signup failed" });
//   }
// });

// 🔑 User Login API (JWT Authentication)
// app.post("/api/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ error: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

//     const token = jwt.sign({ userId: user._id, role: user.role }, "your_jwt_secret", { expiresIn: "7d" });
//     res.json({ message: "Login successful", token });
//   } catch (error) {
//     res.status(500).json({ error: "Login failed" });
//   }
// });

// // 🔐 JWT Middleware (Protect API Routes)
// const verifyToken = (req, res, next) => {
//   const token = req.headers["authorization"];
//   if (!token) return res.status(401).json({ error: "Unauthorized" });

//   jwt.verify(token, "your_jwt_secret", (err, decoded) => {
//     if (err) return res.status(403).json({ error: "Invalid token" });
//     req.user = decoded;
//     next();
//   });
// };

// 🎟 Protected Route (Example)
// app.get("/api/admin/dashboard", verifyToken, (req, res) => {
//   res.json({ message: "Welcome to the admin dashboard!", user: req.user });
// });

// // 🌟 Superadmin Initialization
// const initializeSuperadmin = async () => {
//   try {
//     const existingSuperadmin = await User.findOne({ role: "superadmin" });

//     if (!existingSuperadmin) {
//       const hashedPassword = await bcrypt.hash("securepassword", 10);
//       const superadmin = new User({
//         username: "Superadmin",
//         email: "superadmin@example.com",
//         password: hashedPassword,
//         role: "superadmin",
//       });

//       await superadmin.save();
//       console.log("✅ Superadmin account created!");
//     } else {
//       console.log("⚠️ Superadmin already exists.");
//     }
//   } catch (error) {
//     console.error("❌ Error initializing Superadmin:", error);
//   }
// };

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
