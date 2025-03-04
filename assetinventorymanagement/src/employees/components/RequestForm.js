import React, { useState } from 'react';
import './RequestForm.css';



const RequestForm = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [reason, setReason] = useState('');
  const [urgency, setUrgency] = useState('Low');
  const [quantity, setQuantity] = useState(1);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      employeeName,
      reason,
      urgency,
      quantity,
    };
    console.log('Request Submitted:', requestData);

    // handle the request submission, like sending it to an API, here
  };

  return (
    <div>
      <h2>Employee Request Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="employee-name">Employee Name:</label>
          <input
            type="text"
            id="employee-name"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="reason">Reason for Request:</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows="4"
            cols="50"
            required
          />
        </div>

        <div>
          <label htmlFor="urgency">Urgency:</label>
          <select
            id="urgency"
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
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
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
            min="1"
          />
        </div>

        <div>
          <button type="submit">Submit Request</button>

        </div>
      </form>
    </div>
  );
};

export default RequestForm;