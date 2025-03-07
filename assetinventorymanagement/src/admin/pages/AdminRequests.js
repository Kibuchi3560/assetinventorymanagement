import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Form } from 'react-bootstrap';
import { fetchRequests, updateRequest } from '../redux/requestsSlice';

const AdminRequests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests.items);
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);

  const filteredRequests = filterStatus ? requests.filter((r) => r.status === filterStatus) : requests;

  const handleAction = (requestId, status) => {
    dispatch(updateRequest({ id: requestId, status }));
  };

  return (
    <div className="container my-4">
      <h1>Manage Requests</h1>
      <p>View, prioritize, and manage asset requests and repair requests from users.</p>
      <Form.Select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="mb-3"
      >
        <option value="">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </Form.Select>
      <Table striped hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Asset</th>
            <th>Type</th>
            <th>Urgency</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.user}</td>
              <td>{request.asset}</td>
              <td>{request.request_type}</td>
              <td>{request.urgency}</td>
              <td>{request.status}</td>
              <td>
                {request.status === 'Pending' && (
                  <>
                    
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminRequests;