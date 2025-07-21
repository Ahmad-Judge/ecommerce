import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Home/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="sidebar bg-dark text-white p-3">
      <h4 className="text-center">Admin Tools</h4>
      <Link to="/admin/dashboard">
        <i className="fas fa-tachometer-alt"></i> Dashboard
      </Link>
      <Link to="/admin/products">
        <i className="fas fa-box"></i> Products
      </Link>
      <Link to="/admin/categories">
        <i className="fas fa-tags"></i> Categories
      </Link>
      <Link to="/admin/adminOrders">
        <i className="fas fa-shopping-cart"></i> Orders
      </Link>
      {user && (
        <button className="btn btn-danger w-100 mt-3" onClick={() => logout(navigate)}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      )}
    </div>
  );
};

export default Sidebar;
