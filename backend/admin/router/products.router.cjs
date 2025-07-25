const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../../config/cloudinary.config.cjs');
const Product = require('../../models/product.model.cjs');
const mongoose = require('mongoose');
// Configure Multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads"); // Directory to store files
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
//   },
// });

const upload = multer({ storage: storage });

// Admin dashboard (optional)
router.get("/admin/dashboard", (req, res) => {
  res.render("admin/dashboard", { layout: "admin/admin-layout" });
});

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

    const products = await Product.find(filter).populate("category");
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get a single product by ID
router.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching product" });
  }
});

// Create a new product
router.post('/api/products', upload.single('file'), async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
      category: new mongoose.Types.ObjectId(req.body.category),
      picture: req.file.path, // Cloudinary URL
      isFeatured: req.body.isFeatured === 'true' || req.body.isFeatured === true,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Cloudinary Upload Error:', err);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

// Edit a product



router.put("/api/products/:id", upload.single("file"), async (req, res) => {
  try {
    const productId = req.params.id;

    const category = mongoose.isValidObjectId(req.body.category)
      ? mongoose.Types.ObjectId(req.body.category)
      : undefined;

    let imageUrl = req.body.picture; // fallback to existing picture

    // If new image is uploaded, upload to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });
      imageUrl = result.secure_url;
    }

    const updateData = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      category,
      size: req.body.size,
      gender: req.body.gender,
      isFeatured: req.body.isFeatured === "true" || req.body.isFeatured === true,
      picture: imageUrl,
    };

    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(400).json({ error: "Invalid data submitted" });
  }
});



// Delete a product
router.delete("/api/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting product" });
  }
});

module.exports = router;
