import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllocationForm = ({ onAllocationSuccess }) => {
  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assetsRes, usersRes] = await Promise.all([
          axios.get('/api/assets', { withCredentials: true }),
          axios.get('/api/users', { withCredentials: true }),
        ]);
        setAssets(assetsRes.data.filter(a => a.status === 'Available') || []);
        setEmployees(usersRes.data || []);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAsset || !selectedEmployee) {
      alert('Please select both asset and employee.');
      return;
    }
    try {
      const employee = employees.find(e => e.id === parseInt(selectedEmployee));
      const response = await axios.post(`/api/assets/${selectedAsset}/allocate`, {
        employee_id: employee.employee_id, // Use Employee ID
        quantity,
      }, { withCredentials: true });
      if (response.status === 200) {
        alert('Asset successfully allocated!');
        const newAllocation = {
          assetName: assets.find(a => a.id === parseInt(selectedAsset)).name,
          employeeName: employee.username,
          quantity,
        };
        onAllocationSuccess(newAllocation);
        setSelectedAsset('');
        setSelectedEmployee('');
        setQuantity(1);
      }
    } catch (err) {
      alert('Error allocating asset: ' + (err.response?.data.message || err.message));
    }
  };

  return (
    <div>
      <h2>Allocate Asset</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Asset</label>
          <select value={selectedAsset} onChange={(e) => setSelectedAsset(e.target.value)} required>
            <option value="">Select Asset</option>
            {assets.map((asset) => (
              <option key={asset.id} value={asset.id}>{asset.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Employee</label>
          <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)} required>
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>{employee.username}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min="1"
            required
          />
        </div>
        <button type="submit">Allocate Asset</button>
      </form>
    </div>
  );
};

export default AllocationForm;