import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';

// Manager Components
import Dashboard from './manager/Dashboard/DashboardLayout';
import AllocationLogic from './manager/DataLogic/allocationLogic';
import ApprovedRequestsPage from './manager/RequestManagement/ApproveRequestModal';
import RejectedRequestsPage from './manager/RequestManagement/RejectRequestModal';
import AllocationForm from './manager/AssetAllocation/AllocationForm';
import AssetManagement from './manager/AssetManagement/AssetManagement'; // Fixed typo
import AssetAllocationTable from './manager/AssetAllocation/AssetAllocationTable';
import PendingRequestsTable from './manager/RequestManagement/ApproveRequestModal';
import CompletedRequestsTable from './manager/RequestManagement/CompletedRequestsTable';

// Admin Components
import AdminLayout from './admin/components/AdminLayout';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminUsers from './admin/pages/AdminUsers';
import AdminAssets from './admin/pages/AdminAssets';
import AdminRequests from './admin/pages/AdminRequests';
import AuditLogs from './admin/pages/AuditLogs';
import SystemConfig from './admin/pages/SystemConfig';
import Reports from './admin/pages/Reports';

// Employee Components
import EmployeeDashboard from './employees/components/EmployeeDashboard';
import RequestForm from './employees/components/RequestForm';
import RepairForm from './employees/components/EmployeeRepairForm';
import Requests from './employees/components/Requests';
import Repairs from './employees/components/Repairs';
import Assets from './employees/components/Assets'; // Added for consistency
import Login from './employees/components/Login';
import Signup from './employees/components/Signup';

// PrivateRoute wrapper to protect routes based on authentication and roles
const PrivateRoute = ({ element, roles }) => {
  const { user, role } = useSelector((state) => state.auth);
  console.log('PrivateRoute - User:', user, 'Role:', role);
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(role)) return <Navigate to="/" />;
  return element;
};

function App() {
  const [allocations, setAllocations] = useState([]);

  useEffect(() => {
    AllocationLogic.getAllocations()
      .then((data) => setAllocations(data || []))
      .catch((error) => console.error('Error fetching allocations:', error));
  }, []);

  const handleAllocationSuccess = (newAllocation) => {
    setAllocations((prevAllocations) => [...prevAllocations, newAllocation]);
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Employee Routes */}
        <Route
          path="/employee/dashboard"
          element={<PrivateRoute element={<EmployeeDashboard />} roles={['Employee']} />}
        />
        <Route
          path="/requestform"
          element={<PrivateRoute element={<RequestForm />} roles={['Employee']} />}
        />
        <Route
          path="/repairform"
          element={<PrivateRoute element={<RepairForm />} roles={['Employee']} />}
        />
        <Route
          path="/requests"
          element={<PrivateRoute element={<Requests />} roles={['Employee']} />}
        />
        <Route
          path="/repairs"
          element={<PrivateRoute element={<Repairs />} roles={['Employee']} />}
        />
        <Route
          path="/assets"
          element={<PrivateRoute element={<Assets />} roles={['Employee']} />}
        />

        {/* Manager Routes */}
        <Route
          path="/manager/dashboard"
          element={<PrivateRoute element={<Dashboard />} roles={['Manager']} />}
        />
        <Route
          path="/manager/approved"
          element={<PrivateRoute element={<ApprovedRequestsPage />} roles={['Manager']} />}
        />
        <Route
          path="/manager/rejected"
          element={<PrivateRoute element={<RejectedRequestsPage />} roles={['Manager']} />}
        />
        <Route
          path="/manager/allocate-asset" // Corrected from "allocation-assert"
          element={
            <PrivateRoute
              element={<AllocationForm onAllocationSuccess={handleAllocationSuccess} />}
              roles={['Manager']}
            />
          }
        />
        <Route
          path="/manager/asset-allocated"
          element={
            <PrivateRoute
              element={<AssetAllocationTable allocations={allocations} />}
              roles={['Manager']}
            />
          }
        />
        <Route
          path="/manager/manage-assets"
          element={<PrivateRoute element={<AssetManagement />} roles={['Manager']} />}
        />
        <Route
          path="/manager/pending-requests"
          element={<PrivateRoute element={<PendingRequestsTable />} roles={['Manager']} />}
        />
        <Route
          path="/manager/completed-requests"
          element={<PrivateRoute element={<CompletedRequestsTable />} roles={['Manager']} />}
        />

        {/* Admin Routes with Nested Layout */}
        <Route path="/admin" element={<PrivateRoute element={<AdminLayout />} roles={['Admin']} />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="assets" element={<AdminAssets />} />
          <Route path="requests" element={<AdminRequests />} />
          <Route path="audit-logs" element={<AuditLogs />} />
          <Route path="system-config" element={<SystemConfig />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Fallback for unmatched routes */}
        <Route path="*" element={<p>404 - Page Not Found</p>} />
      </Routes>
    </Router>
  );
}

export default App;