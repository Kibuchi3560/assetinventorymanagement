import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateAsset, deleteAsset } from '../../redux/assetsSlice';

const AssetInventory = ({ assets }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const filteredAssets = assets.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.id.toString().includes(search)
  );

  const handleEdit = (assetId) => {
    // Placeholder for edit logic
    console.log(`Edit asset ${assetId}`);
  };

  const handleDecommission = (assetId) => {
    dispatch(deleteAsset(assetId));
  };

  const handleReassign = (assetId) => {
    // Placeholder for reassignment logic
    console.log(`Reassign asset ${assetId}`);
  };

  return (
    <div>
      <Form.Control
        type="text"
        placeholder="Search by ID or Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3"
      />
      <Table striped hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Purchase Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssets.map(asset => (
            <tr key={asset.id}>
              <td>{asset.id}</td>
              <td>{asset.name}</td>
              <td>{asset.category}</td>
              <td>{asset.status}</td>
              <td>{asset.assignedTo || 'Unassigned'}</td>
              <td>{asset.purchaseDate}</td>
              <td>
                <Button variant="outline-primary" size="sm" onClick={() => handleEdit(asset.id)} className="me-2">Edit</Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDecommission(asset.id)} className="me-2">Decommission</Button>
                <Button variant="outline-info" size="sm" onClick={() => handleReassign(asset.id)}>Reassign</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AssetInventory;
