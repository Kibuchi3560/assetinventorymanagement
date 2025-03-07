import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Allocate.css';

const AllocationForm = ({ onAllocationSuccess }) => {
  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assetsResponse = await axios.get('/api/assets', { withCredentials: true });
        setAssets(assetsResponse.data || []);
        const employeesResponse = await axios.get('/api/users', { withCredentials: true });
        setEmployees(employeesResponse.data || []);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
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
      const response = await axios.post(`/api/assets/${selectedAsset}/allocate`, {
        employee_id: selectedEmployee, 
        user_id: selectedEmployee,     
        quantity,
      }, { withCredentials: true });
      
      if (response.status === 200) {
        alert('Asset successfully allocated!');
        const newAllocation = {
          assetName: assets.find(a => a.id === selectedAsset)?.name || 'Unknown',
          employeeName: employees.find(e => e.id === selectedEmployee)?.username || 'Unknown',
          quantity,
          id: `${selectedAsset}-${selectedEmployee}-${Date.now()}`, // Generate a temp ID
        };
        onAllocationSuccess(newAllocation);
        setSelectedAsset('');
        setSelectedEmployee('');
        setQuantity(1);
      }
    } catch (error) {
      setError('Error allocating asset');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Allocate Asset</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
            onChange={(e) => setQuantity(Number(e.target.value))}
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
