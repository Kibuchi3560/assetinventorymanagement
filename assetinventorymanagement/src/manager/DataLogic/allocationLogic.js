import axios from 'axios';

axios.defaults.withCredentials = true;

export const allocateAsset = async (assetId, employeeId, quantity) => {
  try {
    const response = await axios.post(`/api/assets/${assetId}/allocate`, {
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
    const response = await axios.get('/api/assets'); // Filter on frontend
    return response.data.filter(asset => asset.status === 'allocated');
  } catch (error) {
    console.error('Error fetching allocations:', error);
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { allocateAsset, getAllocations };