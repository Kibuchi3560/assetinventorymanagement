import React, { useState, useEffect } from 'react';
import assetLogic from '../DataLogic/assetLogic'; 

const AssetManagement = () => {
  const [assets, setAssets] = useState([]); 
  const [assetId, setAssetId] = useState(null); 
  const [assetName, setAssetName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all assets on initial load
    assetLogic.getAssets()
      .then((data) => {
        if (Array.isArray(data)) {
          setAssets(data);
        } else {
          setAssets([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching assets:', err);
        setError('Failed to load assets');
      });
  }, []);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const assetData = { name: assetName, category, quantity, image };
    assetLogic.addAsset(assetData)
      .then((response) => {
        if (response.success) {
          setAssets([...assets, response.asset]); 
          alert('Asset added successfully');
        }
      })
      .catch((error) => {
        alert('Error adding asset');
      });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const updatedAsset = { id: assetId, name: assetName, category, quantity, image };
    assetLogic.updateAsset(updatedAsset)
      .then((response) => {
        if (response.success) {
          setAssets(
            assets.map((asset) => (asset.id === assetId ? response.asset : asset))
          ); 
          alert('Asset updated successfully');
          setAssetId(null); 
        }
      })
      .catch((error) => {
        alert('Error updating asset');
      });
  };

  const handleDelete = (id) => {
    assetLogic.deleteAsset(id)
      .then((response) => {
        if (response.success) {
          setAssets(assets.filter((asset) => asset.id !== id)); 
          alert('Asset deleted successfully');
        }
      })
      .catch((error) => {
        alert('Error deleting asset');
      });
  };

  const handleSelectAsset = (id) => {
    const selectedAsset = assets.find((asset) => asset.id === id);
    if (selectedAsset) {
      setAssetId(selectedAsset.id);
      setAssetName(selectedAsset.name);
      setCategory(selectedAsset.category);
      setQuantity(selectedAsset.quantity);
      setImage(selectedAsset.image);
    }
  };

  return (
    <div>
      <h3>Assets</h3>

      {/* Assets as Cards */}
      <div className="row">
        {assets.length > 0 ? (
          assets.map((asset) => (
            <div className="col-12 col-md-4 mb-4" key={asset.id}>
              <div className="card">
                <img
                  src={asset.image || 'https://via.placeholder.com/150'}
                  className="card-img-top"
                  alt={asset.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{asset.name}</h5>
                  <p className="card-text">
                    <strong>Category:</strong> {asset.category}
                  </p>
                  <p className="card-text">
                    <strong>Quantity:</strong> {asset.quantity}
                  </p>

                  {/* Action Buttons */}
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSelectAsset(asset.id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(asset.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No assets available</p>
          </div>
        )}
      </div>

      {/* Add or Update Asset Form */}
      <h2>Asset Management</h2>
      <form onSubmit={assetId ? handleUpdateSubmit : handleAddSubmit}>
        <div className="mb-3">
          <label className="form-label">Asset Name</label>
          <input
            type="text"
            className="form-control"
            value={assetName}
            onChange={(e) => setAssetName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Asset Image</label>
          <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}  
            placeholder="Enter image URL"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {assetId ? 'Update Asset' : 'Add Asset'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AssetManagement;