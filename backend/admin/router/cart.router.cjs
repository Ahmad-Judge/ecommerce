const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const ProductModel = require("../../models/product.model.cjs");
// const OrderModel = require("../../models/order.model"); // Ensure it's properly imported
const router = express.Router();

// Helper function to fetch product details
async function getCartDetails(cart) {
    const productIds = Object.keys(cart);
    console.log("Product IDs in Cart:", productIds);

    if (productIds.length === 0) return [];

    const products = await ProductModel.find({ _id: { $in: productIds } });
    console.log("Fetched Products from DB:", products);

    return products.map(product => ({
        ...product.toObject(),
        quantity: cart[product._id] || 1
    }));
}

// Checkout Route (expects cart data in request body from localStorage)
router.post("/checkout", async (req, res) => {
    try {
        const { name, email, address, paymentMethod, cart } = req.body;
        
        if (!name || !email || !address || !paymentMethod) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (!cart || Object.keys(cart).length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        const cartDetails = await getCartDetails(cart);
        const total = cartDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const newOrder = new OrderModel({
            name,
            email,
            address,
            paymentMethod,
            cart,
            total,
            status: "Processing",
            createdAt: new Date()
        });

        await newOrder.save();
        
        res.status(200).json({ 
            message: "Order placed successfully", 
            orderId: newOrder._id,
            total: total 
        });
    } catch (error) {
        console.error("Checkout error:", error);
        res.status(500).json({ error: "Error processing checkout" });
    }
});

module.exports = router;