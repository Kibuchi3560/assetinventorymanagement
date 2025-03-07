import React, { useState, useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';
import axios from 'axios';

const AuditLogs = () => {
  const [search, setSearch] = useState('');
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('/api/activity-log', { withCredentials: true })
      .then((response) => setLogs(response.data))
      .catch((error) => console.error('Error fetching logs:', error));
  }, []);

  const filteredLogs = logs.filter(
    (log) =>
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.timestamp.includes(search)
  );

  return (
    <div className="container my-4">
      <h1>Audit Logs</h1>
      <p>Monitor user activities and system events for compliance and accountability.</p>
      <Form.Control
        type="text"
        placeholder="Search logs by action or timestamp"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3"
      />
      <Table striped hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Timestamp</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.timestamp}</td>
              <td>{log.action}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AuditLogs;