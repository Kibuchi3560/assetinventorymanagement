import React, { useState } from 'react';
import ApproveRequest from './ApproveRequestModal';
import RejectRequest from './RejectRequestModal';
import Filters from './Filters';

const PendingRequestsTable = ({ requests = [] }) => {
  const [pendingRequests, setPendingRequests] = useState(requests || []);
  const [filteredRequests, setFilteredRequests] = useState(requests || []);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState(""); 

  const handleApprove = (requestId, comment) => {
    setPendingRequests(pendingRequests.filter(request => request.id !== requestId));
    setFilteredRequests(filteredRequests.filter(request => request.id !== requestId));
    console.log(`Request ${requestId} approved. Comment: ${comment}`);
    setSelectedRequest(null);
  };

  const handleReject = (requestId, comment) => {
    setPendingRequests(pendingRequests.filter(request => request.id !== requestId));
    setFilteredRequests(filteredRequests.filter(request => request.id !== requestId));
    console.log(`Request ${requestId} rejected. Comment: ${comment}`);
    setSelectedRequest(null);
  };

  const handleFilterChange = (filter) => {
    if (!filter) {
      setFilteredRequests(pendingRequests);
    } else {
      setFilteredRequests(pendingRequests.filter(request => request.urgency === filter));
    }
  };

  return (
    <div>
      <h2>Pending Requests</h2>
      <Filters onFilterChange={handleFilterChange} />
      
      {Array.isArray(filteredRequests) && filteredRequests.length === 0 ? (
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
                <td>{request.employeeName || "Unknown"}</td>
                <td>{request.assetType}</td>
                <td>{request.reason}</td>
                <td>{request.urgency}</td>
                <td>
                  <button onClick={() => { setSelectedRequest(request); setActionType("approve"); }}>Approve</button>
                  <button onClick={() => { setSelectedRequest(request); setActionType("reject"); }}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedRequest && (
        <div className="modal">
          {actionType === "approve" ? (
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