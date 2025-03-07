// src/employees/components/EmployeeLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../admin/components/Header'; // Reuse admin header
import Sidebar from '../components/Sidebar'; // Employee-specific sidebar
import '../../AppLayout.css'; // Shared CSS

const EmployeeLayout = ({ user, onLogout }) => {
    return (
      <div>
        <Header user={user} onLogout={onLogout} />
        <Sidebar role="employee" />
        <div style={{ marginLeft: '250px', padding: '80px 20px 20px' }}>
          <Outlet />
        </div>
      </div>
    );
  };
  
  export default EmployeeLayout;