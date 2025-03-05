import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MetricCard = ({ icon, title, value, variant }) => (
  <Card className={`border-${variant} shadow-sm`}>
    <Card.Body>
      <Row className="align-items-center">
        <Col xs={4} className="text-center">
          <FontAwesomeIcon icon={icon} size="2x" className={`text-${variant}`} />
        </Col>
        <Col xs={8}>
          <h6 className="text-muted mb-1">{title}</h6>
          <h3 className="mb-0">{value}</h3>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

const DashboardMetrics = ({ metrics }) => (
  <Row className="mb-4 g-4">
    {metrics.map((metric, index) => (
      <Col key={index} xs={12} md={6} lg={4}>
        <MetricCard {...metric} />
      </Col>
    ))}
  </Row>
);

export default DashboardMetrics;
