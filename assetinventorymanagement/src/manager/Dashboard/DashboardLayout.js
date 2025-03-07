// src/manager/Dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faInbox, faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [data, setData] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestsResponse = await axios.get('/api/requests', { withCredentials: true });
        const assetsResponse = await axios.get('/api/assets', { withCredentials: true });
        const assets = assetsResponse.data || [];
        setPendingRequests(requestsResponse.data.filter(req => req.status === 'Pending') || []);
        setData([
          { name: 'Electronics', assets: assets.filter(a => a.category === 'Electronics').length },
          { name: 'Furniture', assets: assets.filter(a => a.category === 'Furniture').length },
          { name: 'Detergents', assets: assets.filter(a => a.category === 'Detergents').length },
          { name: 'Vehicles', assets: assets.filter(a => a.category === 'Vehicles').length },
        ]);
        setStats([
          { name: <>Total Assets <FontAwesomeIcon icon={faBox} /></>, value: assets.length },
          { name: <>Pending Requests <FontAwesomeIcon icon={faInbox} /></>, value: requestsResponse.data.filter(r => r.status === 'Pending').length },
          { name: <>Approved Requests <FontAwesomeIcon icon={faCheckCircle} /></>, value: requestsResponse.data.filter(r => r.status === 'Approved').length },
          { name: <>Rejected Requests <FontAwesomeIcon icon={faExclamationTriangle} /></>, value: requestsResponse.data.filter(r => r.status === 'Rejected').length },
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container py-4">
      <h1>Manager Dashboard</h1>
      <div className="row g-2 mb-3">
        {stats.map((stat, index) => (
          <div key={index} className="col-md-3">
            <div className="card p-3">
              <h5>{stat.name}</h5>
              <h3>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="row g-2">
        <div className="col-md-6">
          <div className="card p-3">
            <h2 className="h5">Asset Distribution</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="assets" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3">
            <h2 className="h5">Asset Growth</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="assets" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;