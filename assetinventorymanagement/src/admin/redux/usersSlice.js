import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('/api/users', { withCredentials: true });
  return response.data;
});

export const addUser = createAsyncThunk('users/addUser', async (userData) => {
  const response = await axios.post('/api/users', userData, { withCredentials: true });
  return response.data.user;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: { items: [], status: 'idle', error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default usersSlice.reducer;