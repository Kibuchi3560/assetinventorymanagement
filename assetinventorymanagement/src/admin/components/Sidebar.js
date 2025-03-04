import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink for active styling
import { FaTachometerAlt, FaUsers, FaCube, FaEnvelope, FaClipboardList, FaCogs, FaChartBar } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar d-flex flex-column bg-light border-end" style={{ width: '250px', minHeight: '100vh', overflowY: 'auto' }}>
      <div className="p-3 sidebar-header">
        <h4>Admin Panel</h4>
      </div>
      <ul className="nav nav-pills flex-column mb-auto p-3">
        <li className="nav-item mb-2">
          <NavLink to="/admin/dashboard" className="nav-link" activeClassName="active">
            <FaTachometerAlt className="me-2" />
            <span className="link-text">Dashboard</span>
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/admin/users" className="nav-link" activeClassName="active">
            <FaUsers className="me-2" />
            <span className="link-text">Manage Users</span>
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/admin/assets" className="nav-link" activeClassName="active">
            <FaCube className="me-2" />
            <span className="link-text">Manage Assets</span>
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/admin/requests" className="nav-link" activeClassName="active">
            <FaEnvelope className="me-2" />
            <span className="link-text">Requests</span>
          </NavLink>
        </li>
        {/* <li className="nav-item mb-2">
          <NavLink to="/admin/audit-logs" className="nav-link" activeClassName="active">
            <FaClipboardList className="me-2" />
            <span className="link-text">Audit Logs</span>
          </NavLink>
        </li> */}
        <li className="nav-item mb-2">
          <NavLink to="/admin/system-config" className="nav-link" activeClassName="active">
            <FaCogs className="me-2" />
            <span className="link-text">System Config</span>
          </NavLink>
        </li>
        {/* <li className="nav-item mb-2">
          <NavLink to="/admin/reports" className="nav-link" activeClassName="active">
            <FaChartBar className="me-2" />
            <span className="link-text">Reports</span>
          </NavLink>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;