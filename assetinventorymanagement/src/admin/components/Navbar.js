import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { FaTachometerAlt, FaUsers, FaBox, FaFileAlt, FaHistory, FaCog } from 'react-icons/fa';

const AppNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm mt-2">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Link as={NavLink} to="/admin/dashboard" activeClassName="active" className="d-flex align-items-center">
            <FaTachometerAlt className="me-2" /> Dashboard
          </Nav.Link>
          <Nav.Link as={NavLink} to="/admin/users" activeClassName="active" className="d-flex align-items-center">
            <FaUsers className="me-2" /> Users
          </Nav.Link>
          <Nav.Link as={NavLink} to="/admin/assets" activeClassName="active" className="d-flex align-items-center">
            <FaBox className="me-2" /> Assets
          </Nav.Link>
          <Nav.Link as={NavLink} to="/admin/requests" activeClassName="active" className="d-flex align-items-center">
            <FaFileAlt className="me-2" /> Requests
          </Nav.Link>
          
          <Nav.Link as={NavLink} to="/admin/system-config" activeClassName="active" className="d-flex align-items-center">
            <FaCog className="me-2" /> System Config
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;