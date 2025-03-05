import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sidebar.css';

const Sidebar = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside className="d-flex flex-column p-3 bg-white text-blue" style={{ width: '250px', height: '100vh', position: 'sticky', top: '60px', overflowY: 'auto' }}>
        <nav>
          <ul className="nav flex-column">
            <li className="nav-item"><Link className="nav-link text-blue" to="/manager/dashboard">Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link text-blue" to="/manager/manage-assets">Manage Assets</Link></li>
            <li className="nav-item"><Link className="nav-link text-blue" to="/manager/pending-requests">Pending & Approved Requests</Link></li>
            <li className="nav-item"><Link className="nav-link text-blue" to="/manager/allocation-assert">Allocate Asset</Link></li>
            <li className="nav-item"><Link className="nav-link text-blue" to="/manager/asset-allocated">Asset Allocated</Link></li>
            <li className="nav-item"><Link className="nav-link text-blue" to="/manager/completed-requests">Completed Requests</Link></li>
            <li className="nav-item"><Link className="nav-link text-blue" to="/manager/rejected">Reject Request</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-grow-1 p-3">{children}</main>
    </div>
  );
};

export default Sidebar;