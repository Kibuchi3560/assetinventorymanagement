import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApproveRequest from './ApproveRequestModal';
import RejectRequest from './RejectRequestModal';
import Filters from './Filters';

const PendingRequestsTable = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/api/requests?status=Pending', { withCredentials: true });
        setPendingRequests(response.data);
        setFilteredRequests(response.data);
      } catch (err) {
        setError('Failed to fetch requests');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleApprove = async (requestId, comment) => {
    try {
      await axios.put(`/api/requests/${requestId}/approve`, {}, { withCredentials: true });
      setPendingRequests(pendingRequests.filter(r => r.id !== requestId));
      setFilteredRequests(filteredRequests.filter(r => r.id !== requestId));
      alert(`Request ${requestId} approved${comment ? `: ${comment}` : ''}`);
      setSelectedRequest(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Error approving request');
      console.error(error);
    }
  };

  const handleReject = async (requestId, comment) => {
    try {
      await axios.put(`/api/requests/${requestId}/reject`, {}, { withCredentials: true });
      setPendingRequests(pendingRequests.filter(r => r.id !== requestId));
      setFilteredRequests(filteredRequests.filter(r => r.id !== requestId));
      alert(`Request ${requestId} rejected${comment ? `: ${comment}` : ''}`);
      setSelectedRequest(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Error rejecting request');
      console.error(error);
    }
  };

  const handleFilterChange = (filter) => {
    if (!filter) setFilteredRequests(pendingRequests);
    else setFilteredRequests(pendingRequests.filter(request => request.urgency === filter));
  };

  if (loading) return <p>Loading requests...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Pending Requests</h2>
      <Filters onFilterChange={handleFilterChange} />
      {filteredRequests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Asset</th>
              <th>Reason</th>
              <th>Urgency</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map(request => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.user}</td>
                <td>{request.asset}</td>
                <td>{request.reason}</td>
                <td>{request.urgency}</td>
                <td>
                  <button onClick={() => { setSelectedRequest(request); setActionType('approve'); }}>Approve</button>
                  <button onClick={() => { setSelectedRequest(request); setActionType('reject'); }}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedRequest && (
        <div className="modal">
          {actionType === 'approve' ? (
            <ApproveRequest
              request={selectedRequest}
              onApprove={handleApprove}
              onCancel={() => setSelectedRequest(null)}
            />
          ) : (
            <RejectRequest
              request={selectedRequest}
              onReject={handleReject}
              onCancel={() => setSelectedRequest(null)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PendingRequestsTable;
