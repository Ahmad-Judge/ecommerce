import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./cart.css";

const API_BASE_URL = "http://localhost:5000/cart";

const Cart = () => {
    const [cart, setCart] = useState([]);

    // Fetch cart items
    useEffect(() => {
        axios.get(`${API_BASE_URL}`, { withCredentials: true })
            .then(res => {
                console.log("Fetched Cart Data:", res.data.products); // ✅ Debugging
                setCart(res.data.products);
            })
            .catch(err => console.error("Error fetching cart:", err));
    }, []);

    // ✅ Moved updateQuantity inside the component
    const updateQuantity = async (productId, quantity) => {
        if (quantity < 1) return;

        try {
            const res = await axios.post(
                "http://localhost:5000/update-cart-quantity",
                { productId, quantity },
                { withCredentials: true }
            );

            // ✅ Update state with the new cart
            setCart(prevCart =>
                prevCart.map(item =>
                    item._id === productId ? { ...item, quantity } : item
                )
            );
        } catch (err) {
            console.error("Error updating quantity:", err);
        }
    };

    // Remove from cart
    const removeFromCart = (productId) => {
        axios.delete(`${API_BASE_URL}/remove/${productId}`)
            .then(() => {
                setCart(cart.filter(item => item._id !== productId));
            })
            .catch(err => console.error("Error removing item:", err));
    };

    // Calculate total price
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="container mt-4" style={{ color: "white" }}>
            <h1>Shopping Cart</h1>

            {cart.length > 0 ? (
                <>
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>Product</th>
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
                                    <td>PKR {item.price.toFixed(2) * item.quantity}</td>
                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            className="form-control form-control-sm"
                                            onChange={e => updateQuantity(item._id, parseInt(e.target.value) || 1)}
                                        />
                                    </td>
                                    <td>
                                        <img
                                            src={`http://localhost:5000/uploads/${item.picture}`}
                                            alt={item.title}
                                            width="50px"
                                        />
                                    </td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item._id)}>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="3" className="text-end"><strong>Total</strong></td>
                                <td colSpan="3">PKR {totalPrice.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className="d-flex justify-content-between">
                        <Link to="/" className="btn btn-primary">Continue Shopping</Link>
                        <Link to="/checkout" className="btn btn-success">Checkout</Link>
                    </div>
                </>
            ) : (
                <p>Your cart is empty. <Link to="/">Add products</Link></p>
            )}
        </div>
    );
};

export default Cart;
