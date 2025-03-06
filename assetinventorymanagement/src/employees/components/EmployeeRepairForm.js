import React, { useState } from 'react';
import axios from 'axios';
import './RepairForm.css';

const EmployeeRepairForm = () => {
  const [formData, setFormData] = useState({
    asset_id: '',
    issueDescription: '',
    priority: 'Low',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/requests', {
        asset_id: formData.asset_id,
        request_type: 'Repair',
        reason: formData.issueDescription,
        urgency: formData.priority,
      }, { withCredentials: true });
      if (response.status === 201) {
        alert('Repair request submitted!');
      }
    } catch (error) {
      console.error('Error submitting repair request:', error);
    }
  };

  return (
    <div className="repair-form-container">
      <h2>Employee Repair Request Form</h2>
      <form onSubmit={handleSubmit} className="repair-form">
        <div className="form-group">
          <label htmlFor="asset_id">Asset ID:</label>
          <input
            type="text"
            id="asset_id"
            name="asset_id"
            value={formData.asset_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="issueDescription">Issue Description:</label>
          <textarea
            id="issueDescription"
            name="issueDescription"
            value={formData.issueDescription}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority Level:</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">Submit Repair Request</button>
      </form>
    </div>
  );
};

export default EmployeeRepairForm;