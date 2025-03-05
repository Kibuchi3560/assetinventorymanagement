import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { fetchAssets, deleteAsset } from '../redux/assetsSlice';

const AdminAssets = () => {
  const dispatch = useDispatch();
  const assets = useSelector((state) => state.assets.items);

  useEffect(() => {
    dispatch(fetchAssets());
  }, [dispatch]);

  const handleDecommission = (id) => {
    dispatch(deleteAsset(id));
  };

  return (
    <div className="container my-4">
      <h1>List Assets</h1>
      <Table striped hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td>{asset.id}</td>
              <td>{asset.name}</td>
              <td>{asset.category}</td>
              <td>{asset.status}</td>
              <td>{asset.assignedTo || 'Unassigned'}</td>
              <td>
                <Button variant="outline-primary" size="sm" className="me-2">Edit</Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDecommission(asset.id)}>Decommission</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminAssets;