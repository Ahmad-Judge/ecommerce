const express = require("express");
const router = express.Router();
const Product = require("../../models/product.model.cjs");
const Category = require("../../models/category.model.cjs");
const multer = require("multer");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Directory to store files
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  },
});
const upload = multer({ storage: storage });
const isAuthenticated = require("../../middleware/auth.cjs");

// Protect all admin routes
router.use(isAuthenticated);
// Get all products (with optional filters)
router.get("/api/products", async (req, res) => {
  try {
    let query = req.query.q || "";
    let categoryFilter = req.query.category || "";
    let featuredFilter = req.query.isFeatured || "";

    let filter = {};

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { "category.title": { $regex: query, $options: "i" } },
      ];
    }

    if (categoryFilter) filter.category = categoryFilter;
    if (featuredFilter) filter.isFeatured = featuredFilter === "true";

    let products = await Product.find(filter).populate("category");
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get a single product by ID
router.get("/api/products/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id).populate("category");
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching product" });
  }
});

// Create a new product
router.post("/api/products", upload.single("file"), async (req, res) => {
  try {
    let newProduct = new Product({
      ...req.body,
      picture: req.file ? req.file.filename : null,
      isFeatured: Boolean(req.body.isFeatured),
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating product" });
  }
});

// Edit a product
router.put("/api/products/:id", upload.single("file"), async (req, res) => {
  try {
    let updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        picture: req.file ? req.file.filename : req.body.picture, // Keep old image if no new upload
        isFeatured: Boolean(req.body.isFeatured),
      },
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating product" });
  }
});

// Delete a product
router.delete("/api/products/:id", async (req, res) => {
  try {
    let deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting product" });
  }
});

module.exports = router;
