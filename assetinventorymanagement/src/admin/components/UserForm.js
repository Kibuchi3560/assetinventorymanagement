import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/usersSlice';
import axios from 'axios';

const UserForm = () => {
  const dispatch = useDispatch();
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({ username: '', role: 'Employee', department: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/assetinventorymanagement/departments', { withCredentials: true })
      .then((response) => setDepartments(response.data))
      .catch((error) => console.error('Error fetching departments:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.department) {
      setError('Username and department are required.');
      return;
    }
    try {
      await dispatch(addUser(formData)).unwrap();
      setFormData({ username: '', role: 'Employee', department: '' });
      setError(null);
    } catch (err) {
      setError('Failed to add user. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input
          id="username"
          type="text"
          className="form-control"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          placeholder="Enter username"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="role" className="form-label">Role</label>
        <select
          id="role"
          className="form-select"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="department" className="form-label">Department</label>
        <select
          id="department"
          className="form-select"
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          required
        >
          <option value="">Select Department</option>
          {departments.map((dep, idx) => (
            <option key={idx} value={dep}>{dep}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Add User</button>
    </form>
  );
};

export default UserForm;