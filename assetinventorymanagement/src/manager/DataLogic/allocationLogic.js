import axios from 'axios';

axios.defaults.withCredentials = true;

export const allocateAsset = async (assetId, employeeId, quantity) => {
  try {
    const response = await axios.post(`/api/assets/${assetId}/allocate`, {
      employee_id: employeeId,
      user_id: employeeId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error('Error allocating asset:', error);
    throw error;
  }
};

export const getAllocations = async () => {
  try {
    const response = await axios.get('/api/assets');
    return response.data.filter(asset => asset.status === 'Allocated');
  } catch (error) {
    console.error('Error fetching allocations:', error);
    throw error;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { allocateAsset, getAllocations };
