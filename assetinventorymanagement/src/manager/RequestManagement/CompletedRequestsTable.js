import React from 'react';

const CompletedRequestsTable = ({ requests }) => {
  if (!Array.isArray(requests)) {
    return <p>No completed requests available.</p>;
  }

  return (
    <div className="completed-requests-table">
      <h2>Completed Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Employee Name</th>
            <th>Asset Type</th>
            <th>Reason</th>
            <th>Completion Date</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.employeeName}</td>
              <td>{request.assetType}</td>
              <td>{request.reason}</td>
              <td>{request.completionDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedRequestsTable;