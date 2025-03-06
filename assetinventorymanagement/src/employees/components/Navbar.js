import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(' /api/logout', {}, { withCredentials: true });
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      navigate('/');
    }
  };

  return (
    <nav>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </nav>
  );
};

export default Navbar;