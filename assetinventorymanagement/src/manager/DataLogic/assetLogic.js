import axios from 'axios';

axios.defaults.withCredentials = true;

const getAssets = async () => {
  try {
    const response = await axios.get('/api/assets');
    return response.data;
  } catch (error) {
    console.error('Error fetching assets:', error);
    throw error;
  }
};

const addAsset = async (assetData) => {
  try {
    const response = await axios.post('/api/assets', assetData);
    return response.data.asset; // Return the asset object
  } catch (error) {
    console.error('Error adding asset:', error);
    throw error;
  }
};

const updateAsset = async (assetId, assetData) => {
  try {
    const response = await axios.put(`/api/assets/${assetId}`, assetData);
    return response.data.asset; // Assume asset is returned
  } catch (error) {
    console.error('Error updating asset:', error);
    throw error;
  }
};

const deleteAsset = async (assetId) => {
  try {
    await axios.delete(`/api/assets/${assetId}`);
    return true; // Success indicator
  } catch (error) {
    console.error('Error deleting asset:', error);
    throw error;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAssets, addAsset, updateAsset, deleteAsset };
