import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clearCart } from "../redux/slices/cartSlice";

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const API_URL = import.meta.env.VITE_API_URL;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        paymentMethod: "credit_card",
    });

    const [cart, setCart] = useState({});
    const [cartProducts, setCartProducts] = useState([]);

    // Get cart from localStorage
    const getCartFromStorage = () => {
        try {
            const cart = localStorage.getItem('cart');
            return cart ? JSON.parse(cart) : {};
        } catch (error) {
            console.error('Error parsing cart from localStorage:', error);
            return {};
        }
    };

    // Load cart and fetch product details
    useEffect(() => {
        const loadCart = async () => {
            const storedCart = getCartFromStorage();
            setCart(storedCart);

            if (Object.keys(storedCart).length > 0) {
                try {
                    // Fetch all products
                    const response = await axios.get(`${API_URL}/api/products`);
                    const allProducts = response.data;
                    
                    // Filter products that are in cart and add quantities
                    const productsInCart = allProducts
                        .filter(product => storedCart[product._id])
                        .map(product => ({
                            ...product,
                            quantity: storedCart[product._id]
                        }));
                    
                    setCartProducts(productsInCart);
                } catch (error) {
                    console.error("Error fetching products:", error);
                }
            }
        };

        loadCart();
    }, [API_URL]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cart || Object.keys(cart).length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const total = cartProducts.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        if (total === 0) {
            alert("Invalid total amount!");
            return;
        }

        const orderData = {
            ...formData,
            cart,
            total,
        };

        try {
            const response = await axios.post(`${API_URL}/orders`, orderData, {
                headers: { "Content-Type": "application/json" },
            });

            alert("Order placed successfully!");
            
            // Clear cart from localStorage and Redux
            localStorage.removeItem('cart');
            dispatch(clearCart());
            
            navigate("/confirm", { state: response.data.order });
        } catch (error) {
            console.error("Order error:", error.response?.data || error.message);
            alert(error.response?.data?.error || "Failed to place order. Please try again.");
        }
    };

    return (
        <div className="container my-5 text-light">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card bg-dark text-light shadow-sm p-4">
                        <h2 className="mb-4 text-center">Checkout</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Address</label>
                                <textarea
                                    name="address"
                                    className="form-control"
                                    rows="3"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Payment Method</label>
                                <select
                                    name="paymentMethod"
                                    className="form-select"
                                    value={formData.paymentMethod}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="credit_card">Credit Card</option>
                                    <option value="paypal">PayPal</option>
                                    <option value="cash_on_delivery">Cash on Delivery</option>
                                </select>
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">
                                    Confirm Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;