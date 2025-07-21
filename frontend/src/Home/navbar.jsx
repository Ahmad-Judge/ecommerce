import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid position-relative">
          <div className="d-flex justify-content-between align-items-center w-100">
            <Link className="navbar-brand fs-1" to="/admin/signup">
              Sapphire
            </Link>
            <div className="search-bar-container d-none d-lg-flex">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control rounded-pill"
                  placeholder="Find Your Favourites"
                />
                <button className="btn" type="submit">
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <i className="fas fa-truck fa-lg mx-3" />
              <i className="fas fa-user fa-lg mx-3" />
              <Link className="nav-link text-dark" to="/cart">
                <i className="fas fa-shopping-cart fa-lg mx-3"></i>
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <hr />
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid">
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/contact-us">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/about-us">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/admin/adminpanel">
                  Admin Panel
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/login">
                  Log/Sign
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
