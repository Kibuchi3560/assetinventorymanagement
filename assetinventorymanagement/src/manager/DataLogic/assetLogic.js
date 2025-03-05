import axios from 'axios';

axios.defaults.withCredentials = true;

const getAssets = async () => {
  try {
    const response = await axios.get('https://assetinventorymanagement.onrender.com/assets');
    return response.data;
  } catch (error) {
    console.error('Error fetching assets:', error);
    throw error;
  }
};

const addAsset = async (assetData) => {
  try {
    const response = await axios.post('https://assetinventorymanagement.onrender.com/assets', assetData);
    return response.data;
  } catch (error) {
    console.error('Error adding asset:', error);
    throw error;
  }
};

const updateAsset = async (assetId, assetData) => {
  try {
    const response = await axios.put(` https://cors-anywhere.herokuapp.com/https://assetinventorymanagement.onrender.com/assets/${assetId}`, assetData);
    return response.data;
  } catch (error) {
    console.error('Error updating asset:', error);
    throw error;
  }
};

const deleteAsset = async (assetId) => {
  try {
    const response = await axios.delete(` https://cors-anywhere.herokuapp.com/https://assetinventorymanagement.onrender.com/assets/${assetId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting asset:', error);
    throw error;
  }
};

export default { getAssets, addAsset, updateAsset, deleteAsset };