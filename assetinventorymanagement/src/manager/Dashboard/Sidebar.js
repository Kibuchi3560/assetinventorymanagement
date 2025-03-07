// src/manager/components/ManagerSidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaCube, FaEnvelope, FaCheckCircle, FaWrench } from 'react-icons/fa';
import '../../admin/components/Sidebar.css'; // Shared styling

const ManagerSidebar = () => {
  return (
    <div className="sidebar d-flex flex-column bg-light">
      <div className="p-3 sidebar-header">
        <h4>Manager Panel</h4>
      </div>
      <ul className="nav nav-pills flex-column mb-auto p-3">
        <li className="nav-item mb-2">
          <NavLink to="/manager/dashboard" className="nav-link">
            <FaTachometerAlt className="me-2" /> Dashboard
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/manager/manage-assets" className="nav-link">
            <FaCube className="me-2" /> Manage Assets
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/manager/pending-requests" className="nav-link">
            <FaEnvelope className="me-2" /> Pending Requests
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/manager/allocate-asset" className="nav-link">
            <FaWrench className="me-2" /> Allocate Asset
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/manager/completed-requests" className="nav-link">
            <FaCheckCircle className="me-2" /> Completed Requests
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default ManagerSidebar;