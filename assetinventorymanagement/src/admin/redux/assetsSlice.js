import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAssets = createAsyncThunk('assets/fetchAssets', async () => {
  const response = await axios.get('/api/assets', { withCredentials: true });
  return response.data;
});

export const addAsset = createAsyncThunk('assets/addAsset', async (assetData) => {
  const response = await axios.post('/api/assets', assetData, { withCredentials: true });
  return response.data.asset;
});

export const updateAsset = createAsyncThunk('assets/updateAsset', async (assetData) => {
  const response = await axios.put(`/api/assets/${assetData.id}`, assetData, { withCredentials: true });
  return response.data.asset;
});

export const deleteAsset = createAsyncThunk('assets/deleteAsset', async (id) => {
  await axios.delete(`/api/assets/${id}`, { withCredentials: true });
  return id;
});

const assetsSlice = createSlice({
  name: 'assets',
  initialState: { items: [], status: 'idle', error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addAsset.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateAsset.fulfilled, (state, action) => {
        const index = state.items.findIndex((a) => a.id === action.payload.id);
        if (index >= 0) state.items[index] = action.payload;
      })
      .addCase(deleteAsset.fulfilled, (state, action) => {
        state.items = state.items.filter((a) => a.id !== action.payload);
      });
  },
});

export default assetsSlice.reducer;