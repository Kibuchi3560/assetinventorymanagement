import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  const headerHeight = '130px'; // Total height of header + navbar (adjust as needed)

  return (
    <div>
      {/* Header fixed at the top */}
      <Header style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: headerHeight, 
        zIndex: 1000 
      }} />

      {/* Sidebar fixed on the left, starting below the header */}
      <div style={{ 
        position: 'fixed', 
        top: headerHeight, 
        left: 0, 
        width: '250px', 
        height: `calc(100vh - ${headerHeight})`, 
        overflowY: 'auto' 
      }}>
        <Sidebar />
      </div>

      {/* Main content offset to the right and below the header */}
      <div style={{ 
        marginLeft: '250px', 
        paddingTop: headerHeight 
      }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;