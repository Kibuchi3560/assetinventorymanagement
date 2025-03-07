import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../admin/redux/authSlice';
import './Login.css';

const Login = () => {
  const [form, setForm] = useState({ name: '', password: '', role: '1', showPassword: false });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const roleMap = { '1': 'Admin', '2': 'Manager', '3': 'Employee' };

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
      const response = await axios.post('/api/assetinventorymanagement/login', {
        name: form.name,
        password: form.password,
        role: form.role,
      }, { withCredentials: true });

      if (response.status === 200) {
        const { user } = response.data;
        const roleStr = roleMap[form.role];
        dispatch(setAuth({ user: user.name, role: roleStr }));
        
        if (roleStr === 'Admin') navigate('/admin/dashboard');
        else if (roleStr === 'Manager') navigate('/manager/dashboard');
        else navigate('/employee/dashboard');
      }
    } catch (err) {
      setError(err.response?.data.message || 'Login failed.');
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
          <input type="checkbox" checked={form.showPassword} onChange={togglePasswordVisibility} />
          Show Password
        </label>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;