import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

// Helper functions for localStorage
const getCartFromStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : {};
  } catch (error) {
    console.error('Error parsing cart from localStorage:', error);
    return {};
  }
};

const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = getCartFromStorage();
    setCart(storedCart);
  }, []);

  // Update cart and save to localStorage
  const updateCart = (newCart) => {
    setCart(newCart);
    saveCartToStorage(newCart);
  };

  // Add item to cart
  const addToCart = (productId, quantity = 1) => {
    const newCart = { ...cart };
    newCart[productId] = (newCart[productId] || 0) + quantity;
    updateCart(newCart);
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    const newCart = { ...cart };
    delete newCart[productId];
    updateCart(newCart);
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    const newCart = { ...cart };
    newCart[productId] = quantity;
    updateCart(newCart);
  };

  // Clear entire cart
  const clearCart = () => {
    setCart({});
    localStorage.removeItem('cart');
  };

  // Get total items count
  const getTotalItems = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  const value = {
    cart,
    updateCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};