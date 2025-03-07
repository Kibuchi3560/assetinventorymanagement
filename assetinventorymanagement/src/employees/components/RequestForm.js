import React, { useState } from 'react';
import axios from 'axios';
import './RequestForm.css';

const RequestForm = () => {
  const [formData, setFormData] = useState({
    reason: '',
    urgency: 'Low',
    quantity: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/requests', {
        request_type: 'New Asset',
        reason: formData.reason,
        urgency: formData.urgency,
        quantity: formData.quantity,
      }, { withCredentials: true });
      if (response.status === 201) {
        alert('Request submitted!');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  return (
    <div>
      <h2>Employee Request Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reason">Reason for Request:</label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows="4"
            cols="50"
            required
          />
        </div>
        <div>
          <label htmlFor="urgency">Urgency:</label>
          <select
            id="urgency"
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default RequestForm;