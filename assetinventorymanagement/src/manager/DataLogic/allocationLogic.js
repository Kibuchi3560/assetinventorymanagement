import axios from 'axios';

axios.defaults.withCredentials = true;

export const allocateAsset = async (assetId, employeeId, quantity) => {
  try {
    const response = await axios.post(` https://cors-anywhere.herokuapp.com/https://assetinventorymanagement.onrender.com/assets/${assetId}/allocate`, {
      user_id: employeeId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error('Error allocating asset:', error);
  }
};

export const getAllocations = async () => {
  try {
    const response = await axios.get(' https://cors-anywhere.herokuapp.com/https://assetinventorymanagement.onrender.com/assets'); // Filter on frontend
    return response.data.filter(asset => asset.status === 'allocated');
  } catch (error) {
    console.error('Error fetching allocations:', error);
  }
};

export default { allocateAsset, getAllocations };