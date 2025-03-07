// src/employees/components/EmployeeDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import RequestCard from './RequestCard';

const EmployeeDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [repairs, setRepairs] = useState([]);
  const [assets, setAssets] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [requestsRes, assetsRes] = await Promise.all([
          axios.get('/api/requests/me', { withCredentials: true }),
          axios.get('/api/assets/allocated', { withCredentials: true }),
        ]);
        const allRequests = requestsRes.data || [];
        setRequests(allRequests);
        setRepairs(allRequests.filter(r => r.request_type === 'Repair'));
        setAssets(assetsRes.data || []);
      } catch (err) {
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Metrics similar to AdminDashboard
  const metricsData = [
    { title: 'Total Requests', value: requests.length, variant: 'primary' },
    { title: 'Repair Requests', value: repairs.length, variant: 'warning' },
    { title: 'Allocated Assets', value: assets.length, variant: 'success' },
  ];

  return (
    <Container fluid className="py-4">
      <h1>Employee Dashboard</h1>
      {/* Metrics Section */}
      <Row className="mb-4">
        {metricsData.map((metric, index) => (
          <Col key={index} md={4}>
            <Card className={`text-white bg-${metric.variant} mb-3`}>
              <Card.Body>
                <Card.Title>{metric.title}</Card.Title>
                <Card.Text style={{ fontSize: '2rem' }}>{metric.value}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        <Col lg={8}>
          {/* Requests Card */}
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h2>Requests</h2>
              <Link to="/employee/requests">
                <Button variant="light" size="sm">View All</Button>
              </Link>
            </Card.Header>
            <Card.Body>
              {requests.length === 0 ? (
                <p>No requests available.</p>
              ) : (
                requests.map(r => <RequestCard key={r.id} request={r} />)
              )}
            </Card.Body>
          </Card>

          {/* Repair Requests Card */}
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h2>Repair Requests</h2>
              <Link to="/employee/repairs">
                <Button variant="light" size="sm">View All</Button>
              </Link>
            </Card.Header>
            <Card.Body>
              {repairs.length === 0 ? (
                <p>No repair requests available.</p>
              ) : (
                repairs.map(r => <RequestCard key={r.id} request={r} />)
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          {/* Allocated Assets Card */}
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h2>Allocated Assets</h2>
              <Link to="/employee/assets">
                <Button variant="light" size="sm">View All</Button>
              </Link>
            </Card.Header>
            <Card.Body>
              {assets.length === 0 ? (
                <p>No assets allocated.</p>
              ) : (
                <ul className="list-unstyled">
                  {assets.map(asset => (
                    <li key={asset.id}>
                      <strong>{asset.name}</strong> - Allocated on {asset.allocationDate || 'N/A'} (Status: {asset.status})
                    </li>
                  ))}
                </ul>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeDashboard;
