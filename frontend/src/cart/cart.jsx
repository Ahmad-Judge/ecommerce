import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./cart.css";

const API_URL = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${API_URL}/cart`;

const Cart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get(API_BASE_URL, { withCredentials: true })
            .then(res => setCart(res.data.products))
            .catch(err => console.error("Error fetching cart:", err));
    }, []);

    const updateQuantity = async (productId, quantity) => {
        if (quantity < 1) return;

        try {
            await axios.post(
                `${API_URL}/update-cart-quantity`,
                { productId, quantity },
                { withCredentials: true }
            );

            setCart(prevCart =>
                prevCart.map(item =>
                    item._id === productId ? { ...item, quantity } : item
                )
            );
        } catch (err) {
            console.error("Error updating quantity:", err);
        }
    };

    const removeFromCart = (productId) => {
        axios.delete(`${API_BASE_URL}/remove/${productId}`, { withCredentials: true })
            .then(() => {
                setCart(cart.filter(item => item._id !== productId));
            })
            .catch(err => console.error("Error removing item:", err));
    };

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="container my-4 text-light">
            <h1 className="mb-4 text-center">Shopping Cart</h1>

            {cart.length > 0 ? (
                <>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover align-middle text-white">
                            <thead className="table-dark">
                                <tr>
                                    <th>Product ID</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Picture</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map(item => (
                                    <tr key={item._id}>
                                        <td>{item._id}</td>
                                        <td>{item.description}</td>
                                        <td>PKR {(item.price * item.quantity).toFixed(2)}</td>
                                        <td style={{ maxWidth: "80px" }}>
                                            <input
                                                type="number"
                                                min="1"
                                                className="form-control form-control-sm"
                                                value={item.quantity}
                                                onChange={e => updateQuantity(item._id, parseInt(e.target.value) || 1)}
                                            />
                                        </td>
                                        <td>
                                            <img
                                                src={`${API_URL}/uploads/${item.picture}`}
                                                alt={item.title}
                                                className="img-fluid"
                                                style={{ maxWidth: "60px", maxHeight: "60px", objectFit: "cover" }}
                                            />
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => removeFromCart(item._id)}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="3" className="text-end fw-bold">Total</td>
                                    <td colSpan="3" className="fw-bold">PKR {totalPrice.toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div className="d-flex flex-column flex-sm-row justify-content-between gap-2 mt-4">
                        <Link to="/" className="btn btn-outline-primary w-100 w-sm-auto">Continue Shopping</Link>
                        <Link to="/checkout" className="btn btn-success w-100 w-sm-auto">Checkout</Link>
                    </div>
                </>
            ) : (
                <div className="text-center">
                    <p>Your cart is empty. <Link to="/">Add products</Link></p>
                </div>
            )}
        </div>
    );
};

export default Cart;
