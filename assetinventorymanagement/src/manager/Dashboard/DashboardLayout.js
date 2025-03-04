import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faInbox, faCheckCircle, faExclamationTriangle, faWrench } from "@fortawesome/free-solid-svg-icons";

import 'bootstrap/dist/css/bootstrap.min.css';

// Mock Data
const pendingRequests = [
  { id: 1, request_type: "Laptop", reason: "Replacement needed", quantity: 2, urgency: "High" },
  { id: 2, request_type: "Server", reason: "Failure", quantity: 1, urgency: "High" },
  { id: 3, request_type: "Office Chairs", reason: "Broken", quantity: 10, urgency: "Medium" },
];

// Commented out for API integration
// useEffect(() => {
//   fetch("/api/pending-requests")
//     .then(response => response.json())
//     .then(data => setPendingRequests(data))
//     .catch(error => console.error("Error fetching requests:", error));
// }, []);

const data = [
  { name: "Electronics", assets: 50, requests: 20 },
  { name: "Furniture", assets: 80, requests: 30 },
  { name: "Detergents", assets: 60, requests: 25 },
  { name: "Vehicles", assets: 100, requests: 40 },
];

const stats = [
  { name: <><FontAwesomeIcon icon={faBox} size="2x" style={{ color: "darkblue" }} className="me-2" /> Total Assets</>, value: 200 },
  { name: <><FontAwesomeIcon icon={faInbox} size="2x" className="me-2" /> Pending Requests</>, value: 10 },
  { name: <><FontAwesomeIcon icon={faCheckCircle} size="2x" className="text-success me-2" /> Approved Requests</>, value: 30 },
  { name: <><FontAwesomeIcon icon={faExclamationTriangle} size="2x" className="text-danger me-2" /> Rejected Requests</>, value: 5 },
  { name: <><FontAwesomeIcon icon={faWrench} size="2x" className="me-2" /> Completed Requests</>, value: 50 },
];

// Filter High Urgency Requests
const highUrgencyRequests = pendingRequests.filter(req => req.urgency === "High");

const criticalAlerts = [
  { id: 1, message: "Urgent: Laptop replacement needed", level: "High" },
  { id: 2, message: "Server failure - Immediate action required", level: "High" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Manager Dashboard</h1>
      
      <div className="alert alert-danger">
        <h4>Critical Alerts</h4>
        <ul>
          {criticalAlerts.map(alert => (
            <li key={alert.id}><strong>{alert.message} ({alert.level})</strong></li>
          ))}
        </ul>
      </div>
      
      <div className="row g-2 mb-3">
        {stats.map((stat, index) => (
          <div key={index} className="col-md-4"> 
            <div className="card p-3"> 
              <h5>{stat.name}</h5>
              <h3>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Priority Requests + Buttons */}
      <div className="row mb-3">
        {/* Priority Requests Section - Half Page */}
        <div className="col-md-6">
          <div className="card p-3">
            <h4 className="text-danger">Priority Requests (High Urgency)</h4>
            {highUrgencyRequests.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Request Type</th>
                    <th>Reason</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {highUrgencyRequests.map(request => (
                    <tr key={request.id}>
                      <td>{request.id}</td>
                      <td>{request.request_type}</td>
                      <td>{request.reason}</td>
                      <td>{request.quantity}</td>
                      <td>
                        <button className="btn btn-success btn-sm me-2" onClick={() => navigate("/approved")}>
                          Approve
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => navigate("/rejected")}>
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <p>No high urgency requests.</p>}
          </div>
        </div>

        {/* Buttons Section - Aligned Next to Priority Requests */}
        <div className="col-md-6 d-flex flex-column justify-content-between">
          <button className="btn text-black mb-3" style={{ backgroundColor: "blue" }} onClick={() => navigate("/manage-assets")}>
            View Assets
          </button>
          <button className="btn text-black mb-3" style={{ backgroundColor: "green" }} onClick={() => navigate("/allocation-assert")}>
            Allocate Assets
          </button>
          <button className="btn text-black mb-3" style={{ backgroundColor: "aqua" }} onClick={() => navigate("/rejected")}>
            Approve/Reject Requests
          </button>
          <button className="btn text-black" style={{ backgroundColor: "darkgoldenrod" }} onClick={() => navigate("/completed-requests")}>
            Completed Requests
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row g-2 mb-3">
        <div className="card p-3 col">
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
        
        <div className="card p-3 col">
          <h2 className="h5">Requests Overview</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="requests" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Bottom Buttons */}
      <div className="row g-2 mb-3">
        <button className="btn btn-light col" onClick={() => navigate("/pending-requests")}>New Requests</button>
        <button className="btn btn-light col" onClick={() => navigate("/approved")}>Approval Reminders</button>
      </div>
    </div>
  );
};

export default Dashboard;