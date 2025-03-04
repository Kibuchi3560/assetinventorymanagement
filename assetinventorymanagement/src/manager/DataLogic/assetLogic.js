
const getAssets = async () => {
  try {
    const response = await fetch('/api/assets');
    return await response.json();
  } catch (error) {
    console.error('Error fetching assets:', error);
    throw error;
  }
};

const addAsset = async (assetData) => {
  try {
    const response = await fetch('/api/assets', {
      method: 'POST',
      body: JSON.stringify(assetData),
      headers: { 'Content-Type': 'application/json' },
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding asset:', error);
    throw error;
  }
};

const updateAsset = async (assetId, assetData) => {
  try {
    const response = await fetch(`/api/assets/${assetId}`, {
      method: 'PUT',
      body: JSON.stringify(assetData),
      headers: { 'Content-Type': 'application/json' },
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating asset:', error);
    throw error;
  }
};


const deleteAsset = async (assetId) => {
  try {
    const response = await fetch(`/api/assets/${assetId}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting asset:', error);
    throw error;
  }
};

// Exporting all functions as a default export
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAssets, addAsset, updateAsset, deleteAsset };