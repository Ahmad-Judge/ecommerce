const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session"); // Ensure session handling is set up
const ProductModel = require("../../models/product.model.cjs");
// const OrderModel = require("../../models/order.model"); // Ensure it's properly imported
const router = express.Router();

// Use session-based cart


// function getCartFromCookies(req) {
//     try {
//         return req.cookies.cart ? JSON.parse(req.cookies.cart) : {};
//     } catch (error) {
//         console.error("Error parsing cart cookie:", error);
//         return {};
//     }
// }
const getCartFromCookies = (req) => {
    const cartCookie = req.cookies.cart;
    return cartCookie ? JSON.parse(cartCookie) : {};
};

router.post("/update-cart-quantity", async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Validate inputs
        if (!mongoose.Types.ObjectId.isValid(productId) || isNaN(quantity) || quantity < 1) {
            return res.status(400).json({ error: "Invalid input" });
        }

        // Get existing cart from cookies
        let cart = getCartFromCookies(req);

        // Update quantity
        cart[productId.toString()] = parseInt(quantity);

        // Store updated cart in cookies
        res.cookie("cart", JSON.stringify(cart), { maxAge: 24 * 60 * 60 * 1000, httpOnly: false });

        // Send updated cart to React frontend
        res.sendStatus(200);
    } catch (error) {
        console.error("Update cart quantity error:", error);
        res.status(500).json({ error: "Error updating cart quantity" });
    }
});
// Helper function to fetch product details
async function getCartDetails(cart) {
    const productIds = Object.keys(cart);
    console.log("Product IDs in Cart:", productIds); // ✅ Check what IDs are stored

    if (productIds.length === 0) return [];

    const products = await ProductModel.find({ _id: { $in: productIds } });
    console.log("Fetched Products from DB:", products); // ✅ Confirm products are fetched

    return products.map(product => ({
        ...product.toObject(),
        quantity: cart[product._id] || 1
    }));
}

// ✅ Add product to cart
router.get("/cart", async (req, res) => {
    try {
        let cart = getCartFromCookies(req);

        // Convert cart to array of product IDs
        const productIds = Object.keys(cart).map(id => new mongoose.Types.ObjectId(id));

        // Find products in cart
        let products = await ProductModel.find({ 
            _id: { $in: productIds } 
        });

        // Add quantity to each product
        const productsWithQuantity = products.map(product => ({
            ...product.toObject(),
            quantity: cart[product._id] || 1
        }));

        // ✅ Send JSON response for React
        res.json({ products: productsWithQuantity });
        

    } catch (error) {
        console.error("Cart loading error:", error);
        res.status(500).json({ message: "Error loading cart" });
    }
});


// ✅ Get cart item count
router.get("/cart/count", (req, res) => {
    const totalItems = req.session.cart 
        ? Object.values(req.session.cart).reduce((acc, qty) => acc + qty, 0)
        : 0;
    res.json({ count: totalItems });
});

// ✅ Get cart items
router.get("/cart/items", async (req, res) => {
    try {
        req.session.cart = req.session.cart || {};
        console.log("Session Cart:", req.session.cart); // ✅ Log session cart data
        const products = await getCartDetails(req.session.cart);
        console.log("Products Fetched:", products); // ✅ Log products being fetched
        res.json(products);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ error: "Error loading cart" });
    }
});

// ✅ Remove product from cart
router.delete("/cart/remove/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid product ID" });
        }

        req.session.cart = req.session.cart || {};
        delete req.session.cart[id];

        res.json({ message: "Product removed from cart", cart: req.session.cart });
    } catch (error) {
        console.error("Remove from cart error:", error);
        res.status(500).json({ error: "Error removing from cart" });
    }
});

// ✅ Update cart quantity
router.post("/cart/update", async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!mongoose.Types.ObjectId.isValid(productId) || isNaN(quantity) || quantity < 1) {
            return res.status(400).json({ error: "Invalid input" });
        }

        req.session.cart = req.session.cart || {};
        req.session.cart[productId] = parseInt(quantity);

        res.sendStatus(200);
    } catch (error) {
        console.error("Update cart error:", error);
        res.status(500).json({ error: "Error updating cart" });
    }
});

// ✅ Checkout Route
router.post("/checkout", async (req, res) => {
    try {
        const { name, email, address, paymentMethod } = req.body;
        if (!name || !email || !address || !paymentMethod) {
            return res.status(400).json({ error: "All fields are required" });
        }

        req.session.cart = req.session.cart || {};
        const cartDetails = await getCartDetails(req.session.cart);
        const total = cartDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const newOrder = new OrderModel({
            name,
            email,
            address,
            paymentMethod,
            cart: req.session.cart,
            total,
            status: "Processing",
            createdAt: new Date()
        });

        await newOrder.save();
        req.session.cart = {}; // Clear cart after checkout

        res.sendStatus(200);
    } catch (error) {
        console.error("Checkout error:", error);
        res.status(500).json({ error: "Error processing checkout" });
    }
});

module.exports = router;
