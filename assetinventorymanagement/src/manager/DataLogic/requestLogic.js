import axios from 'axios';

axios.defaults.withCredentials = true;

const createRequest = async (requestData) => {
  try {
    const response = await axios.post('https://assetinventorymanagement.onrender.com/requests', requestData);
    return response.data;
  } catch (error) {
    console.error('Error creating request:', error);
  }
};

const approveRequest = async (requestId) => {
  try {
    const response = await axios.put(`https://assetinventorymanagement.onrender.com/requests/${requestId}`, { status: 'Approved' });
    return response.data;
  } catch (error) {
    console.error('Error approving request:', error);
  }
};

const rejectRequest = async (requestId) => {
  try {
    const response = await axios.put(`https://assetinventorymanagement.onrender.com/requests/${requestId}`, { status: 'Rejected' });
    return response.data;
  } catch (error) {
    console.error('Error rejecting request:', error);
  }
};

export default { createRequest, approveRequest, rejectRequest };