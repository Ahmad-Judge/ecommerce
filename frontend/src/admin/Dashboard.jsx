import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-primary mb-4">Welcome to the Admin Panel</h2>
      <div className="row g-4">
        <div className="col-md-6 col-lg-4">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">Products</h5>
              <p className="card-text">Manage your product inventory.</p>
              <Link to="/admin/products" className="btn btn-light">View Products</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">Categories</h5>
              <p className="card-text">Manage your categories inventory.</p>
              <Link to="/admin/categories" className="btn btn-light">View Categories</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <h5 className="card-title">Orders</h5>
              <p className="card-text">Process your orders.</p>
              <Link to="/admin/adminOrders" className="btn btn-light">View Orders</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
