import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./cart.css"; // Ensure this file contains styles

const FloatingCartButton = () => {
  const [cartCount, setCartCount] = useState(0);

  // Get cart from localStorage and calculate count
  const getCartFromStorage = () => {
    try {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : {};
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      return {};
    }
  };

  const updateCartCount = () => {
    const cart = getCartFromStorage();
    const count = Object.values(cart || {}).reduce((acc, quantity) => acc + quantity, 0);
    setCartCount(count);
  };

  // Update cart count on component mount
  useEffect(() => {
    updateCartCount();

    // Listen for localStorage changes (when cart is updated in other components)
    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        updateCartCount();
      }
    };

    // Listen for custom cart update events
    const handleCartUpdate = () => {
      updateCartCount();
    };

    // Add event listeners
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCartUpdate);

    // Custom event listener for same-tab updates
    const interval = setInterval(updateCartCount, 1000); // Check every second

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
      clearInterval(interval);
    };
  }, []);

  return (
    <div id="floating-cart-container">
      <Link to="/cart" className="floating-cart-button">
        <FontAwesomeIcon icon={faShoppingCart} size="2x" />
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </Link>
    </div>
  );
};

export default FloatingCartButton;