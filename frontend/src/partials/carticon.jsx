import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../cart/cartcontext"; // ✅ Import Cart Context
import "./cart.css"; // Ensure this file contains styles

const FloatingCartButton = () => {
  const { cart } = useCart(); // ✅ Get cart from context
  const cartCount = Object.values(cart || {}).reduce((acc, quantity) => acc + quantity, 0);

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
