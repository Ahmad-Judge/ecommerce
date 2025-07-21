const express = require("express");
const router = express.Router();
const Category = require("../../models/category.model");

// ✅ Get All Categories (for React)
router.get("/api/categories", async (req, res) => {
    console.log("Fetching categories..."); // ✅ Debugging log
    try {
      let categories = await Category.find();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });
  

// ✅ Create a New Category (for React)
router.post("/api/categories", async (req, res) => {
  try {
    let newCategory = new Category(req.body);
    await newCategory.save();
    res.sendStatus(200);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Failed to create category" });
  }
});

// ✅ Get Single Category by ID (for React)
router.get("/api/categories/:id", async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ error: "Failed to fetch category" });
  }
});

// ✅ Update a Category by ID (for React)
router.put("/api/categories/:id", async (req, res) => {
  try {
    let updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Failed to update category" });
  }
});

// ✅ Delete a Category by ID (for React)
router.delete("/api/categories/:id", async (req, res) => {
  try {
    let deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Failed to delete category" });
  }
});

module.exports = router;
