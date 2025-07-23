import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartQuantity,
  removeFromCart,
} from "../redux/slices/cartSlice";
import "./cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { items: cart, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartQuantity({ productId, quantity }));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;

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
              {cart.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.description}</td>
                  <td>PKR {(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        handleQuantityChange(item._id, parseInt(e.target.value) || 1)
                      }
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
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemove(item._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-end">
                  <strong>Total</strong>
                </td>
                <td colSpan="3">PKR {totalPrice.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          <div className="d-flex justify-content-between">
            <Link to="/" className="btn btn-primary">
              Continue Shopping
            </Link>
            <Link to="/checkout" className="btn btn-success">
              Checkout
            </Link>
          </div>
        </>
      ) : (
        <p>
          Your cart is empty. <Link to="/">Add products</Link>
        </p>
      )}
    </div>
  );
};

export default Cart;
