import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './AdminLayout.css'; // Assuming you create this CSS file

const AdminLayout = () => {
  return (
    <div className="app-layout">
      <Header className="app-header" />
      <div className="app-sidebar">
        <Sidebar />
      </div>
      <div className="app-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;