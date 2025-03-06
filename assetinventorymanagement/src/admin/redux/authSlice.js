import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, role: null },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem('auth');
    },
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
    },
    clearAuth: (state) => {
      state.user = null;
      state.role = null;
    },
  },
});

export const { setCredentials, logout, setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;