// src/employees/components/EmployeeSidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaCube, FaEnvelope, FaWrench } from 'react-icons/fa';
import '../../admin/components/Sidebar.css'; // Shared styling

const EmployeeSidebar = () => {
  return (
    <div className="sidebar d-flex flex-column bg-light">
      <div className="p-3 sidebar-header">
        <h4>Employee Panel</h4>
      </div>
      <ul className="nav nav-pills flex-column mb-auto p-3">
        <li className="nav-item mb-2">
          <NavLink to="/employee/dashboard" className="nav-link">
            <FaTachometerAlt className="me-2" /> Dashboard
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/employee/requestform" className="nav-link">
            <FaEnvelope className="me-2" /> Request Asset
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/employee/repairform" className="nav-link">
            <FaWrench className="me-2" /> Request Repair
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/employee/requests" className="nav-link">
            <FaEnvelope className="me-2" /> My Requests
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/employee/assets" className="nav-link">
            <FaCube className="me-2" /> My Assets
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default EmployeeSidebar;