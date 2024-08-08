
import { createSlice } from '@reduxjs/toolkit';
import { incrementAsync } from './incrementAsync';
import { useEffect } from 'react';

const initialState = {
  cart: [],
  status: 'idle',
  error: null,
};


const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find(cartItem => cartItem._id === item._id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cart.push({ ...item, quantity: item.quantity || 1 });
      }
    },
    decrement: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find(cartItem => cartItem._id === item._id);
      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity <= 0) {
          state.cart = state.cart.filter(cartItem => cartItem._id !== item._id);  // Remove item if quantity is 0
        }
      }
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const item = action.payload.item;
        const existingItem = state.cart.find(cartItem => cartItem._id === item._id);
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          state.cart.push({ ...item, quantity: item.quantity || 1 });
        }
      })
      .addCase(incrementAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement } = counterSlice.actions;
export const selectCartItems = (state) => state.counter.cart;

export default counterSlice.reducer;
