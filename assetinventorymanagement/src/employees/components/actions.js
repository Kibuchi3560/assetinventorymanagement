import axios from 'axios';

// Enable session authentication
axios.defaults.withCredentials = true;

export const createRequest = (newRequest) => {
    return axios.post('/requests', newRequest);
};

export const getRequests = () => {
    // Use /requests/me for employee-specific requests
    return axios.get('/requests/me');
};

export const getRequest = (requestId) => {
    return axios.get(`/requests/${requestId}`);
};

export default { createRequest, getRequests, getRequest };