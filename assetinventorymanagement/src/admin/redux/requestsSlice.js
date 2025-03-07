import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRequests = createAsyncThunk('requests/fetchRequests', async () => {
  const response = await axios.get('/api/requests', { withCredentials: true });
  return response.data;
});

export const createRequest = createAsyncThunk('requests/create', async (requestData) => {
  const response = await axios.post('/api/requests', requestData, { withCredentials: true });
  return response.data.request;
});

export const updateRequest = createAsyncThunk('requests/updateRequest', async ({ id, status }) => {
  const response = await axios.put(`/api/requests/${id}`, { status }, { withCredentials: true });
  return response.data.request;
});

export const approveAllRequests = createAsyncThunk('requests/approveAll', async () => {
  await axios.put('/requests/approve-all', {}, { withCredentials: true });
  const response = await axios.get('/api/requests', { withCredentials: true });
  return response.data;
});

const requestsSlice = createSlice({
  name: 'requests',
  initialState: { items: [], status: 'idle', error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateRequest.fulfilled, (state, action) => {
        const index = state.items.findIndex((r) => r.id === action.payload.id);
        if (index >= 0) state.items[index] = action.payload;
      })
      .addCase(approveAllRequests.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default requestsSlice.reducer;