// routes/cart.js
const express = require("express");
const mongoose = require("mongoose");
const ProductModel = require("../../models/product.model.cjs");
const router = express.Router();

// Utility: Read cart from cookies
const getCartFromCookies = (req) => {
  try {
    const raw = req.cookies.cart;
    return raw ? JSON.parse(decodeURIComponent(raw)) : {}; // Decode URI
  } catch (err) {
    console.error("Cart cookie error:", err);
    return {};
  }
};

// Utility: Fetch product details with quantity
const { Types } = require("mongoose");

const getCartDetails = async (cart) => {
  try {
    const productIds = Object.keys(cart);
    if (productIds.length === 0) return [];

    // ✅ Use `new` when constructing ObjectIds
    const objectIds = productIds.map((id) => new Types.ObjectId(id));

    const products = await ProductModel.find({ _id: { $in: objectIds } });

    return products.map((product) => ({
      ...product.toObject(),
      quantity: cart[product._id.toString()] || 1,
    }));
  } catch (err) {
    console.error("getCartDetails error:", err.message);
    return [];
  }
};


// Middleware to set secure cookie
const setCartCookie = (res, cart) => {
  res.cookie("cart", JSON.stringify(cart), {
    httpOnly: false, // Set to true if cart isn't read on client side
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};

// Get all cart products
router.get("/cart", async (req, res) => {
  try {
    const cart = getCartFromCookies(req);
    console.log("Cart contents:", cart);
    const productsWithQuantity = await getCartDetails(cart);
    res.json({ products: productsWithQuantity });
  } catch (error) {
    console.error("Cart loading error:", error);
    res.status(500).json({ message: "Error loading cart" });
  }
});

// Get cart count
router.get("/cart/count", (req, res) => {
  const cart = getCartFromCookies(req);
  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  res.json({ count: totalItems });
});

// Get raw cart items
router.get("/cart/items", async (req, res) => {
  try {
    const cart = getCartFromCookies(req);
    const products = await getCartDetails(cart);
    res.json(products);
  } catch (error) {
    console.error("Cart fetch error:", error);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// Add or update product in cart
router.post("/update-cart-quantity", async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId) || isNaN(quantity) || quantity < 1) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const cart = getCartFromCookies(req);
    cart[productId.toString()] = parseInt(quantity);

    setCartCookie(res, cart);
    res.sendStatus(200);
  } catch (error) {
    console.error("Cart quantity update error:", error);
    res.status(500).json({ error: "Failed to update cart quantity" });
  }
});

// Remove item from cart
router.delete("/cart/remove/:id", (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const cart = getCartFromCookies(req);
    delete cart[id];

    setCartCookie(res, cart);
    res.json({ message: "Product removed", cart });
  } catch (error) {
    console.error("Remove error:", error);
    res.status(500).json({ error: "Failed to remove product" });
  }
});

module.exports = router;
