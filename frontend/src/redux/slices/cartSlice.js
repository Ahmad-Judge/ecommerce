// src/redux/slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = "http://localhost:5000";

export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const res = await axios.get(`${API_BASE_URL}/cart`, { withCredentials: true });
  return res.data.products;
});

export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity }) => {
    await axios.post(`${API_BASE_URL}/update-cart-quantity`, { productId, quantity }, { withCredentials: true });
    return { productId, quantity };
  }
);

export const removeFromCart = createAsyncThunk("cart/remove", async (productId) => {
  await axios.delete(`${API_BASE_URL}/cart/remove/${productId}`, { withCredentials: true });
  return productId;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        const { productId, quantity } = action.payload;
        const item = state.items.find(item => item._id === productId);
        if (item) item.quantity = quantity;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
