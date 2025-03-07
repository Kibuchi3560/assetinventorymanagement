import axios from 'axios';

axios.defaults.withCredentials = true;

export const fetchRequests = async () => {
  try {
    const response = await axios.get('/api/requests');
    return response.data;
  } catch (error) {
    console.error('Error fetching requests:', error);
    return [];
  }
};

export const fetchRepairs = async () => {
  try {
    const requests = await fetchRequests();
    return requests.filter(request => request.request_type === 'Repair');
  } catch (error) {
    console.error('Error fetching repairs:', error);
    return [];
  }
};

export const fetchAllocatedAssets = async () => {
  try {
    const response = await axios.get('/api/assets');
    // Filter for allocated assets (assuming backend returns a status or user_id field)
    return response.data.filter(asset => asset.status === 'allocated' && asset.user_id);
  } catch (error) {
    console.error('Error fetching allocated assets:', error);
    return [];
  }
};