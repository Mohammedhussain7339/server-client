import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to handle increment action with API call
export const incrementAsync = createAsyncThunk(
  'counter/incrementAsync',
  async (item, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/cart-product`, {
        userId: localStorage.getItem('userId'),
        productId: item._id,
        productQuantity: item.productQuantity
      });
      return { item, response: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
