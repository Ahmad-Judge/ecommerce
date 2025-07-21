import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Home/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        {/* Brand / Logo */}
        <Link className="navbar-brand fw-bold text-primary" to="/admin/dashboard">
          Sapphire Admin
        </Link>

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Admin Panel Links */}
            <li className="nav-item">
              <Link className="nav-link" to="/admin/dashboard">
                <i className="fas fa-tachometer-alt"></i> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/products">
                <i className="fas fa-box"></i> Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/categories">
                <i className="fas fa-tags"></i> Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/adminOrders">
                <i className="fas fa-shopping-cart"></i> Orders
              </Link>
            </li>
            {/* Link back to main site */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="fas fa-home"></i> Main Website
              </Link>
            </li>
          </ul>

          {/* Search bar and logout */}
          <form className="d-flex me-2">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search by Title"
            />
            <button className="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>

          {user && (
            <button
              className="btn btn-danger"
              onClick={() => logout(navigate)}
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
