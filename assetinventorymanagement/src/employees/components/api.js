import axios from 'axios';

// Ensure all requests include credentials for session authentication
axios.defaults.withCredentials = true;

export const fetchRequests = async () => {
  try {
    const response = await axios.get('/requests/me');
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
    const response = await axios.get('/assets/allocated');
    return response.data;
  } catch (error) {
    console.error('Error fetching allocated assets:', error);
    return [];
  }
};