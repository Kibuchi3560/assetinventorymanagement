// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignupPage from '../src/employees/components/Signup'; // Adjust the path as needed
import Login from './employees/components/Login';
import AdminLayout from './admin/components/AdminLayout';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminUsers from './admin/pages/AdminUsers';
import AdminAssets from './admin/pages/AdminAssets';
import AdminRequests from './admin/pages/AdminRequests';
import SystemConfig from './admin/pages/SystemConfig';
import ManagerLayout from './manager/ManagerLayout';
import Dashboard from './manager/Dashboard/DashboardLayout';
import AllocationForm from './manager/AssetAllocation/AllocationForm';
import AssetManagement from './manager/AssetManagement/AssetManagement';
import AssetAllocationTable from './manager/AssetAllocation/AssetAllocationTable';
import PendingRequestsTable from './manager/RequestManagement/PendingRequestsTable';
import CompletedRequestsTable from './manager/RequestManagement/CompletedRequestsTable';
import EmployeeLayout from './employees/components/EmployeeLayout';
import EmployeeDashboard from './employees/components/EmployeeDashboard';
import RequestForm from './employees/components/RequestForm';
import RepairForm from './employees/components/EmployeeRepairForm';
import Requests from './employees/components/Requests';
import Repairs from './employees/components/Repairs';
import Assets from './employees/components/Assets';

const PrivateRoute = ({ element, roles }) => {
  const { user, role } = useSelector((state) => state.auth);
  if (!user) return <Navigate to="/" />;
  if (roles && !roles.includes(role)) return <Navigate to="/" />;
  return element;
};

function App() {
  const [allocations, setAllocations] = useState([]);
  useEffect(() => {
    // Fetch allocations if needed
  }, []);

  const handleAllocationSuccess = (newAllocation) => {
    setAllocations((prev) => [...prev, newAllocation]);
  };

  return (
    <Router>
      <Routes>
        {/* Root route now shows SignupPage */}
        <Route path="/" element={<SignupPage />} />
        {/* Dedicated login route */}
        <Route path="/login" element={<Login />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={<PrivateRoute element={<AdminLayout />} roles={['Admin']} />}
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="assets" element={<AdminAssets />} />
          <Route path="requests" element={<AdminRequests />} />
          <Route path="system-config" element={<SystemConfig />} />
        </Route>

        {/* Manager routes */}
        <Route
          path="/manager"
          element={<PrivateRoute element={<ManagerLayout />} roles={['Manager']} />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manage-assets" element={<AssetManagement />} />
          <Route path="pending-requests" element={<PendingRequestsTable />} />
          <Route
            path="allocate-asset"
            element={<AllocationForm onAllocationSuccess={handleAllocationSuccess} />}
          />
          <Route path="asset-allocated" element={<AssetAllocationTable allocations={allocations} />} />
          <Route path="completed-requests" element={<CompletedRequestsTable requests={[]} />} />
        </Route>

        {/* Employee routes */}
        <Route
          path="/employee"
          element={<PrivateRoute element={<EmployeeLayout />} roles={['Employee']} />}
        >
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="requestform" element={<RequestForm />} />
          <Route path="repairform" element={<RepairForm />} />
          <Route path="requests" element={<Requests />} />
          <Route path="repairs" element={<Repairs />} />
          <Route path="assets" element={<Assets />} />
        </Route>

        <Route path="*" element={<p>404 - Page Not Found</p>} />
      </Routes>
    </Router>
  );
}

export default App;
