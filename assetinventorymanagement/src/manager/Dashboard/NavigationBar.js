import React from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from './Sidebar'

const NavigationBar = () => {
  return (
    <nav className="bg-light py-2">
      <div className="container-fluid text-center">
        <ul className="list-inline mb-0">
          <li className="list-inline-item mx-2">
            <NavLink className="text-decoration-none" activeClassName="fw-bold" to="/">Dashboard</NavLink>
          </li>
          <li className="list-inline-item mx-2">
            <NavLink className="text-decoration-none" activeClassName="fw-bold" to="/manage-assets">Manage Assets</NavLink>
          </li>
          <li className="list-inline-item mx-2">
            <NavLink className="text-decoration-none" activeClassName="fw-bold" to="/pending-requests">Pending & Approved Requests</NavLink>
          </li>
          <li className="list-inline-item mx-2">
            <NavLink className="text-decoration-none" activeClassName="fw-bold" to="/allocation-assert">Allocate Asset</NavLink>
          </li>
          <li className="list-inline-item mx-2">
            <NavLink className="text-decoration-none" activeClassName="fw-bold" to="/asset-allocated">Asset Allocated</NavLink>
          </li>
          <li className="list-inline-item mx-2">
            <NavLink className="text-decoration-none" activeClassName="fw-bold" to="/completed-requests">Completed Requests</NavLink>
          </li>
          <li className="list-inline-item mx-2">
            <NavLink className="text-decoration-none" activeClassName="fw-bold" to="/Rejected">Reject Request</NavLink>
          </li>
          <li className="list-inline-item mx-2">
            <NavLink className="text-decoration-none text-danger" activeClassName="fw-bold" to="/">Exit</NavLink>
          </li>
        </ul>
      </div>
      <Sidebar />

    </nav>
  );
};

export default NavigationBar;