const express = require("express");
const router = express.Router();
const Order = require("../../models/order.model.cjs");
const Product = require("../../models/product.model.cjs");

// Function to calculate total from cart by fetching actual product prices from DB
async function calculateTotal(cart) {
    let total = 0;
    const productIds = Object.keys(cart);

    if (productIds.length === 0) return total;

    const products = await Product.find({ _id: { $in: productIds } });

    products.forEach(product => {
        const quantity = cart[product._id.toString()]?.quantity || 1;
        total += product.price * quantity;
    });

    return total;
}
// Confirm an order
router.post('/orders/confirm/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order && order.status !== 'Confirmed') {
            await Order.findByIdAndUpdate(req.params.id, { status: 'Confirmed' });
        }

        res.sendStatus(200);
    } catch (error) {
        console.error('❌ Error confirming order:', error.message);
        res.status(500).json({ error: "Failed to confirm order" });
    }
});
router.delete('/orders/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error('❌ Error deleting order:', error.message);
        res.status(500).json({ error: "Failed to delete order" });
    }
});

// Cancel an order
router.post('/orders/cancel/:id', async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.params.id, { status: 'Canceled' });
        res.status(200).json({ message: "Order canceled successfully" });
    } catch (error) {
        console.error('❌ Error canceling order:', error.message);
        res.status(500).json({ error: "Failed to cancel order" });
    }
});

// Route to get all orders
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error("❌ Error fetching orders:", error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

// Route to place an order
router.post('/orders', async (req, res) => {
    try {
        const { name, email, address, paymentMethod, cart } = req.body;

        if (!name || !email || !address || !paymentMethod || !cart || Object.keys(cart).length === 0) {
            return res.status(400).json({ error: "All fields and a valid cart are required" });
        }

        // Calculate total price by fetching actual prices from the DB
        const total = await calculateTotal(cart);
        if (total === 0) {
            return res.status(400).json({ error: "Invalid total amount, please check your cart" });
        }

        // Save order to database
        const newOrder = new Order({
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
        console.log("✅ Order saved:", newOrder);

        // Clear the cart cookie
        res.cookie('cart', '', { maxAge: 0 });

        res.sendStatus(200);
    } catch (error) {
        console.error('❌ Checkout Error:', error);
        res.status(500).json({ error: "Something went wrong. Please try again." });
    }
});

module.exports = router;
