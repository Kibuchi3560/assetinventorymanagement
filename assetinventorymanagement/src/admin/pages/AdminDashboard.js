import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
import DashboardMetrics from './AdminDashboard/DashboardMetrics';
import PriorityRequests from './AdminDashboard/PriorityRequests';
import AssetDistribution from './AdminDashboard/AssetDistribution';
import QuickActions from './AdminDashboard/QuickActions';
import CriticalAlerts from './AdminDashboard/CriticalAlerts';
import ActivityLog from './AdminDashboard/ActivityLog';
import AssetInventory from './AdminDashboard/AssetInventory';
import FinancialInsights from './AdminDashboard/FinancialInsights';
// import ReportingExport from './AdminDashboard/ReportingExport';
import MaintenanceSchedule from './AdminDashboard/MaintenanceSchedule';
import { faBox, faTicketAlt, faExclamationTriangle, faDollarSign, faUserSlash, faWrench } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const { assets, requests, users } = useSelector((state) => ({
    assets: state.assets.items || [],
    requests: state.requests.items || [],
    users: state.users.items || [],
  }), shallowEqual);

  const metricsData = [
    { icon: faBox, title: 'Total Assets', value: assets.length, variant: 'primary' },
    { icon: faTicketAlt, title: 'Pending Requests', value: requests.filter(r => r.status === 'pending').length, variant: 'warning' },
    { icon: faExclamationTriangle, title: 'Urgent Requests', value: requests.filter(r => r.urgency === 'high').length, variant: 'danger' },
    { icon: faDollarSign, title: 'Budget Used', value: `$${assets.reduce((sum, a) => sum + (a.cost || 0), 0).toLocaleString()}`, variant: 'success' },
    { icon: faUserSlash, title: 'Unassigned Assets', value: assets.filter(a => !a.assignedTo).length, variant: 'info' },
    { icon: faWrench, title: 'Due for Maintenance', value: assets.filter(a => new Date(a.warrantyExpiry) < new Date()).length, variant: 'warning' },
  ];

  const enhancedRequests = requests.map(request => ({
    ...request,
    userName: users.find(u => u.id === request.userId)?.name || 'Unknown',
    assetName: request.assetId ? assets.find(a => a.id === request.assetId)?.name : 'New Asset Request',
  }));

  const criticalAlerts = [
    ...assets.filter(a => new Date(a.warrantyExpiry) < new Date()),
    ...enhancedRequests.filter(r => r.urgency === 'high'),
  ].slice(0, 3);

  const recentRequests = enhancedRequests
    .filter(r => r.status === 'pending')
    .sort((a, b) => (b.urgency === 'high' ? 1 : -1))
    .slice(0, 5);

  return (
    <div className="container-fluid py-4">
      <CriticalAlerts alerts={criticalAlerts} />
      <DashboardMetrics metrics={metricsData} />
      <Row className="g-4">
        <Col lg={8}>
          
          <Card>
            <Card.Body>
              <Card.Title>Asset Inventory</Card.Title>
              <AssetInventory assets={assets} />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          {/* <QuickActions /> */}
          <AssetDistribution assets={assets} />
          <MaintenanceSchedule assets={assets} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col lg={6}>
          <FinancialInsights assets={assets} />
        </Col>
        <Col lg={6}>
         
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={12}>
          {/* <ActivityLog activities={[]} /> */}
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;