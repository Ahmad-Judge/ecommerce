import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

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

// Async thunk to fetch cart items with product details
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const cart = getCartFromStorage();
      const productIds = Object.keys(cart);
      
      if (productIds.length === 0) {
        return [];
      }

      // Fetch product details from products API
      const response = await axios.get(`${API_URL}/api/products`);
      const allProducts = response.data;
      
      // Filter products that are in cart and add quantities
      const cartProducts = allProducts
        .filter(product => cart[product._id])
        .map(product => ({
          ...product,
          quantity: cart[product._id]
        }));

      return cartProducts;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error fetching cart');
    }
  }
);

// Sync action to update cart quantity
export const updateCartQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ productId, quantity }, { dispatch }) => {
    const cart = getCartFromStorage();
    cart[productId] = quantity;
    saveCartToStorage(cart);
    
    // Refetch cart to get updated data with product details
    dispatch(fetchCart());
    
    return { productId, quantity };
  }
);

// Sync action to remove from cart
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { dispatch }) => {
    const cart = getCartFromStorage();
    delete cart[productId];
    saveCartToStorage(cart);
    
    // Refetch cart to get updated data
    dispatch(fetchCart());
    
    return productId;
  }
);

// Sync action to add to cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (productId, { dispatch }) => {
    const cart = getCartFromStorage();
    cart[productId] = (cart[productId] || 0) + 1;
    saveCartToStorage(cart);
    
    // Refetch cart to get updated data
    dispatch(fetchCart());
    
    return productId;
  }
);

// Sync action to clear cart
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async () => {
    localStorage.removeItem('cart');
    return [];
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update quantity
      .addCase(updateCartQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Clear cart
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export const { clearError } = cartSlice.actions;
export default cartSlice.reducer;