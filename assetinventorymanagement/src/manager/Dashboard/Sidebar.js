import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sidebar.css';

const Sidebar = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside className="d-flex flex-column p-3 bg-white text-blue"
        style={{ width: '250px', height: '100vh', position: 'sticky', top: '60px', overflowY: 'auto' }}>
        <nav>
          <ul className="nav flex-column">
            <li className="nav-item"><Link className="nav-link text-blue" to="/">Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link text-blue" to="/manage-assets">Manage Assets</Link></li>
            <li className="nav-item"><Link className="nav-link text-blue" to="/pending-requests">Pending & Approved Requests</Link></li>
            <li className="nav-item"><Link className="nav-link text-blue" to="/allocation-assert">Allocate Asset</Link></li>
            <li className="nav-item"><Link className="nav-link text-blue" to="/asset-allocated">Asset Allocated</Link></li>
            <li className="nav-item"><Link className="nav-link text-blue" to="/completed-requests">Completed Requests</Link></li>
            <li className="nav-item"><Link className="nav-link text-blue" to="/Rejected">Reject Request</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-3">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;