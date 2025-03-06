import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch for Redux
import { setAuth } from '../../admin/redux/authSlice'; // Adjust the path to your auth slice
import './Login.css';

const Login = () => {
  const [form, setForm] = useState({
    name: '',
    password: '',
    role: '1', // Default to Admin
    showPassword: false,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize Redux dispatch

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setForm({ ...form, showPassword: !form.showPassword });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/api/assetinventorymanagement/login',
        {
          name: form.name,
          password: form.password,
          role: form.role,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const { role, user } = response.data; // Assuming backend returns user and role

        // Update Redux store with user and role
        dispatch(setAuth({ user: user || form.name, role }));

        // Navigate based on role
        if (role === '1') navigate('/admin');
        else if (role === '2') navigate('/manager/dashboard');
        else navigate('/employee/dashboard');
      }
    } catch (error) {
      setError('Login failed');
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type={form.showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="1">Admin</option>
          <option value="2">Manager</option>
          <option value="3">Employee</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={form.showPassword}
            onChange={togglePasswordVisibility}
          />{' '}
          Show Password
        </label>
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
