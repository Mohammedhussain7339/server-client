import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const removeAsync = createAsyncThunk(
    'counter/removeAsync',
    async (productId, { rejectWithValue }) => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.post(`http://localhost:8000/discart-product`, {
          productId,
          userId,
        });
        return { productId, response: response.data };
      } catch (error) {
        console.error(error);
        return rejectWithValue(error.response.data);
      }
    }
  );
    