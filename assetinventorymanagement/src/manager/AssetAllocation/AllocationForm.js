import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Allocate.css';

const AllocationForm = ({ onAllocationSuccess }) => {
  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assetsResponse = await axios.get(' https://cors-anywhere.herokuapp.com/https://assetinventorymanagement.onrender.com/assets', { withCredentials: true });
        setAssets(assetsResponse.data || []);
        const employeesResponse = await axios.get(' https://cors-anywhere.herokuapp.com/https://assetinventorymanagement.onrender.com/users', { withCredentials: true });
        setEmployees(employeesResponse.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedAsset && selectedEmployee) {
      try {
        const response = await axios.post(` https://cors-anywhere.herokuapp.com/https://assetinventorymanagement.onrender.com/assets/${selectedAsset}/allocate`, {
          user_id: selectedEmployee,
          quantity,
        }, { withCredentials: true });
        if (response.status === 200) {
          alert('Asset successfully allocated!');
          const newAllocation = {
            assetName: assets.find(a => a.id === selectedAsset).name,
            employeeName: employees.find(e => e.id === selectedEmployee).username,
            quantity,
            id: response.data.id,
          };
          onAllocationSuccess(newAllocation);
        }
      } catch (error) {
        alert('Error allocating asset!');
        console.error('Error:', error);
      }
    } else {
      alert('Please select both asset and employee.');
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
            onChange={(e) => setQuantity(e.target.value)}
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