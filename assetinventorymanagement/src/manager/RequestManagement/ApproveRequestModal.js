import React, { useState } from "react";
import PendingRequestsTable from "./PendingRequestsTable";

const ApproveRequestPage = ({ request = {}, onApprove, onCancel }) => {
  const [comment, setComment] = useState("");

  if (!request || Object.keys(request).length === 0) {
    return <PendingRequestsTable />; // Don't render if request is undefined or empty
  }

  const handleApprove = () => {
    onApprove(request.id, comment);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Approve Request</h3>
        <p><strong>Employee:</strong> {request.employeeName || "N/A"}</p>
        <p><strong>Asset:</strong> {request.assetType || "N/A"}</p>
        <p><strong>Reason:</strong> {request.reason || "N/A"}</p>

        <label>Approval Comment:</label>
        <textarea 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
          placeholder="Enter approval comment (optional)"
        />

        <div className="modal-actions">
          <button onClick={handleApprove}>Approve</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ApproveRequestPage;