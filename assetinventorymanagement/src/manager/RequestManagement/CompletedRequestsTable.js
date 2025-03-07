import React, { useEffect, useState } from 'react';

const CompletedRequestsTable = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all requests from the backend
    const fetchRequests = async () => {
      try {
        const response = await fetch('/api/requests', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Include any authentication token if required
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRequests(data);  // Set the fetched data to the state
        } else {
          console.error('Failed to fetch requests');
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="requests-table">
      <h2>Completed Requests</h2>
      {requests.length === 0 ? (
        <p>No completed requests available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Employee Name</th>
              <th>Asset Type</th>
              <th>Request Type</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Request Date</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.user}</td>
                <td>{request.asset}</td>
                <td>{request.request_type}</td>
                <td>{request.status}</td>
                <td>{request.reason}</td>
                <td>{new Date(request.request_date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CompletedRequestsTable;