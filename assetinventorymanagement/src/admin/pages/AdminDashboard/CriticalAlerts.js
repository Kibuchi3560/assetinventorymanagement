import React from 'react';
import { Alert } from 'react-bootstrap';

const CriticalAlerts = ({ alerts }) => {
  if (!alerts.length) return null;

  return (
    <Alert variant="danger" className="mb-4">
      <h5>Critical Alerts:</h5>
      <ul className="mb-0">
        {alerts.map((alert, i) => (
          <li key={i}>
            {alert.name || `Request #${alert.id}`} - {alert.issue || 'High urgency request'}
          </li>
        ))}
      </ul>
    </Alert>
  );
};

export default CriticalAlerts;
