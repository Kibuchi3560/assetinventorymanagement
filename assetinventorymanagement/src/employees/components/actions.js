import axios from 'axios';

// Enable session authentication
axios.defaults.withCredentials = true;

export const createRequest = (newRequest) => {
    return axios.post(' https://cors-anywhere.herokuapp.com/https://assetinventorymanagement.onrender.com//requests', newRequest);
};

export const getRequests = () => {
    // Use /requests/me for employee-specific requests
    return axios.get(' https://cors-anywhere.herokuapp.com/https://assetinventorymanagement.onrender.com//requests');
};

export const getRequest = (requestId) => {
    return axios.get(` https://cors-anywhere.herokuapp.com/https://assetinventorymanagement.onrender.com//requests/${requestId}`);
};

export default { createRequest, getRequests, getRequest };