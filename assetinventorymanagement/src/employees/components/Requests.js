import React, { useState, useEffect } from 'react';
import { fetchRequests } from './api';
import './api.css';

const Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const requestsData = await fetchRequests();
      setRequests(requestsData);
    };
    fetchData();
  }, []);

  return (
    <div className="api-container">
      <h1>Your Requests</h1>
      <div className="api-list">
        {requests.length === 0 ? (
          <p>No requests available.</p>
        ) : (
          requests.map((request) => (
            <div className="api-item" key={request.id}>
              <p><strong>Reason:</strong> {request.reason}</p>
              <p><strong>Status:</strong> <span className="status">{request.status}</span></p>
              <p className="date"><strong>Date:</strong> {request.request_date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Requests;