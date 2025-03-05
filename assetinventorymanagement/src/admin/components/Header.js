import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
// import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    await axios.post('/logout', {}, { withCredentials: true });
    dispatch(logout());
    navigate('/login');
  };

  const userName = user ? user.name : 'John Doe';

  return (
    <header className="header bg-primary text-white" style={{ height: '80px' }}>
      <div className="container-fluid h-100">
        <div className="header-top d-flex align-items-center justify-content-between h-100 py-3">
          <h1 className="header-brand h4 mb-0" style={{ fontWeight: 'bold' }}>shulee</h1>
          <div className="position-relative flex-grow-1 mx-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.5rem', borderRadius: '50px' }}
            />
            <FaSearch style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
          </div>
          <div className="d-flex align-items-center">
            <FaUserCircle size={40} className="me-2" />
            <span className="me-3">{userName}</span>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
          </div>
          
        </div>
        <Navbar />
        
      </div>
    </header>
  );
};

export default Header;