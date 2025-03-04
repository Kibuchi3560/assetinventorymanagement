import React, { useState } from 'react';
import './RepairForm.css';


const EmployeeRepairForm = () => {
  const [formData, setFormData] = useState({
    employeeName: '',
    department: 'Technical Mentor',  // Default option set to "Technical Mentor"
    issueDescription: '',
    priority: 'Low',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Repair Request Submitted:', formData);
    // Handle form submission (e.g., save to database, send to an API)
    alert('Repair request submitted!');
  };

  return (
    <div className="repair-form-container">
      <h2>Employee Repair Request Form</h2>
      <form onSubmit={handleSubmit} className="repair-form">
        <div className="form-group">
          <label htmlFor="employeeName">Employee Name:</label>
          <input
            type="text"
            id="employeeName"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="Technical Mentor">Technical Mentor</option>
            <option value="Guards">Guards</option>
            <option value="Janitor">Janitor</option>
          </select>
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