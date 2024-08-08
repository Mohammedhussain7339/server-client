import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: {}, // Using an object to store quantities by product ID
};

export const incDecrement = createSlice({
  name: 'incDecrement',
  initialState,
  reducers: {
    increment: (state, action) => {
      const productId = action.payload;
      if (state.cart[productId]) {
        state.cart[productId] += 1;
      } else {
        state.cart[productId] = 1;
      }
    },
    decrement: (state, action) => {
      const productId = action.payload;
      if (state.cart[productId]) {
        if (state.cart[productId] > 0) {
          state.cart[productId] -= 1;
        }
      }
    },
  },
});

export const { increment, decrement } = incDecrement.actions;
export default incDecrement.reducer;
