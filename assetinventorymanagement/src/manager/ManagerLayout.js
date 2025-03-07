// src/manager/components/ManagerLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../admin/components/Header'; // Reuse admin header
import ManagerSidebar from '../manager/Dashboard/Sidebar'; // Manager-specific sidebar
import '../AppLayout.css'; // Shared CSS

const ManagerLayout = () => {
    return (
      <div className="app-layout">
        <Header className="app-header" />
        <div className="app-sidebar">
          <ManagerSidebar />
        </div>
        <div className="app-content">
          <Outlet />
        </div>
      </div>
    );
  };
  
  export default ManagerLayout;