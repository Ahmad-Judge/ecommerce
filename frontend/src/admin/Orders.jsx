import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminOrders.css";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders`);
      setOrders(response.data);
    } catch (err) {
      setError("Failed to fetch orders. Please try again.");
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOrder = async (id) => {
    try {
      await axios.post(`${API_URL}/orders/confirm/${id}`);
      fetchOrders();
    } catch (err) {
      console.error("Error confirming order:", err);
      alert("Failed to confirm order.");
    }
  };

  const handleCancelOrder = async (id) => {
    try {
      await axios.post(`${API_URL}/orders/cancel/${id}`);
      fetchOrders();
    } catch (err) {
      console.error("Error canceling order:", err);
      alert("Failed to cancel order.");
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`${API_URL}/orders/${id}`);
      fetchOrders();
    } catch (err) {
      console.error("Error deleting order:", err);
      alert("Failed to delete order.");
    }
  };

  if (loading) return <div className="container mt-4"><p>Loading orders...</p></div>;
  if (error) return <div className="container mt-4"><p className="text-danger">{error}</p></div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Order List</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.name}</td>
                  <td>{order.email}</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>{order.status}</td>
                  <td>
                    <div className="d-flex flex-wrap gap-2">
                      {order.status === "Confirmed" || order.status === "Canceled" ? (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteOrder(order._id)}
                        >
                          Delete
                        </button>
                      ) : (
                        <>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleConfirmOrder(order._id)}
                          >
                            Confirm
                          </button>
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => handleCancelOrder(order._id)}
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersList;
