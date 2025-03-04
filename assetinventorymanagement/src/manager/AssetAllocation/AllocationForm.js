import React, { useState, useEffect } from 'react';
import allocationLogic from '../DataLogic/allocationLogic'; 
import assetLogic from '../DataLogic/assetLogic'; 
import './Allocate.css'
 
const AllocationForm = ({ onAllocationSuccess }) => {
  const [assets, setAssets] = useState([]); 
  const [employees, setEmployees] = useState([]); 
  const [selectedAsset, setSelectedAsset] = useState(''); 
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [quantity, setQuantity] = useState(1); 

  useEffect(() => {
    // Fetch assets from backend
    assetLogic.getAssets()
      .then((data) => setAssets(data || [])) 
      .catch((error) => console.error("Error fetching assets:", error));

    // Fetch employees from backend
    fetch('/api/employees') 
      .then((response) => response.json())
      .then((data) => setEmployees(data || [])) 
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedAsset && selectedEmployee) {
      allocationLogic.allocateAsset(selectedAsset, selectedEmployee, quantity)
        .then((response) => {
          if (response.success) {
            alert('Asset successfully allocated!');

            const newAllocation = {
              assetName: response.assetName, 
              employeeName: response.employeeName,
              quantity: response.quantity,
              id: response.id,  
            };
            onAllocationSuccess(newAllocation);  
          } else {
            alert('Error: ' + response.message);
          }
        })
        .catch((error) => {
          alert('Error allocating asset!');
          console.error("Error allocating asset:", error);
        });
    } else {
      alert("Please select both asset and employee.");
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
            {Array.isArray(assets) && assets.length > 0 ? (
              assets.map((asset) => (
                <option key={asset.id} value={asset.id}>
                  {asset.name}
                </option>
              ))
            ) : (
              <option disabled>No assets available</option>
            )}
          </select>
        </div>
        <div>
          <label>Employee</label>
          <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)} required>
            <option value="">Select Employee</option>
            {Array.isArray(employees) && employees.length > 0 ? (
              employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))
            ) : (
              <option disabled>No employees available</option>
            )}
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