import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// 🛒 Thunks
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
    const response = await axios.get(`${API}/cart`, { withCredentials: true });
    return response.data.products;
});

export const updateCartQuantity = createAsyncThunk("cart/updateQuantity", async ({ productId, quantity }) => {
    await axios.post(`${API}/update-cart-quantity`, { productId, quantity }, { withCredentials: true });
    return { productId, quantity };
});

export const removeCartItem = createAsyncThunk("cart/removeItem", async (id) => {
    await axios.delete(`${API}/cart/remove/${id}`, { withCredentials: true });
    return id;
});

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers: {
        clearCart: (state) => {
            state.items = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                const { productId, quantity } = action.payload;
                const item = state.items.find((i) => i._id === productId);
                if (item) {
                    item.quantity = quantity;
                }
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item._id !== action.payload);
            });
    }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
