import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addAsset } from '../redux/assetsSlice';
import axios from 'axios';

const AssetForm = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    image_url: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/categories', { withCredentials: true })
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Error fetching categories:', error));

    axios.get('/api/departments', { withCredentials: true })
      .then((response) => setDepartments(response.data))
      .catch((error) => console.error('Error fetching departments:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.category) {
      setError('Please fill in all required fields.');
      return;
    }
    try {
      await dispatch(addAsset(formData)).unwrap();
      setFormData({ name: '', category: '', image_url: '' });
      setError(null);
    } catch (err) {
      setError('Failed to add asset. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Asset Name</label>
        <input
          id="name"
          type="text"
          className="form-control"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter asset name"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <select
          id="category"
          className="form-select"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="image_url" className="form-label">Image URL (optional)</label>
        <input
          id="image_url"
          type="text"
          className="form-control"
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          placeholder="Enter image URL"
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Asset</button>
    </form>
  );
};

export default AssetForm;