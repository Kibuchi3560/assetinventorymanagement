// src/admin/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaCube, FaEnvelope, FaCogs } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar d-flex flex-column bg-light">
      <div className="p-3 sidebar-header">
        <h4>Admin Panel</h4>
      </div>
      <ul className="nav nav-pills flex-column mb-auto p-3">
        <li className="nav-item mb-2">
          <NavLink to="/admin/dashboard" className="nav-link">
            <FaTachometerAlt className="me-2" /> Dashboard
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/admin/users" className="nav-link">
            <FaUsers className="me-2" /> Manage Users
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/admin/assets" className="nav-link">
            <FaCube className="me-2" /> Manage Assets
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/admin/requests" className="nav-link">
            <FaEnvelope className="me-2" /> Requests
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/admin/system-config" className="nav-link">
            <FaCogs className="me-2" /> System Config
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;