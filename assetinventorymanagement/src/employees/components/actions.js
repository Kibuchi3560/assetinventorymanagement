import axios from 'axios';

// Enable session authentication
axios.defaults.withCredentials = true;

export const createRequest = (newRequest) => {
    return axios.post(' /api//requests', newRequest);
};

export const getRequests = () => {
    // Use /requests/me for employee-specific requests
    return axios.get(' /api//requests');
};

export const getRequest = (requestId) => {
    return axios.get(` /api//requests/${requestId}`);
};

export default { createRequest, getRequests, getRequest };