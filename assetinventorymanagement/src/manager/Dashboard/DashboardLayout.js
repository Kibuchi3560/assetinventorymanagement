import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faInbox,
  faCheckCircle,
  faExclamationTriangle,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

// Assuming this function exists in a separate file (e.g., requestLogic.js)
const updateRequestStatus = async (requestId, status) => {
  try {
    const response = await axios.put(
      `/api/requests/${requestId}`,
      { status },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating request status:", error);
    throw error;
  }
};

const Dashboard = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [data, setData] = useState([]);
  const [stats, setStats] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories from the backend
        const categoriesResponse = await axios.get(
          "/api/assetinventorymanagement/categories",
          { withCredentials: true }
        );
        const fetchedCategories = categoriesResponse.data || [];
        setCategories(fetchedCategories);

        // Fetch requests
        const requestsResponse = await axios.get("/api/requests", {
          withCredentials: true,
        });
        const allRequests = requestsResponse.data || [];
        setPendingRequests(allRequests.filter((req) => req.status === "Pending"));

        // Fetch assets
        const assetsResponse = await axios.get("/api/assets", {
          withCredentials: true,
        });
        const assets = assetsResponse.data || [];

        // Dynamically generate chart data based on fetched categories
        setData(
          fetchedCategories.map((category) => ({
            name: category,
            assets: assets.filter((a) => a.category === category).length,
            requests: allRequests.filter((r) => r.category === category).length,
          }))
        );

        // Set statistics
        setStats([
          {
            name: (
              <>
                <FontAwesomeIcon
                  icon={faBox}
                  size="2x"
                  style={{ color: "darkblue" }}
                  className="me-2"
                />{" "}
                Total Assets
              </>
            ),
            value: assets.length,
          },
          {
            name: (
              <>
                <FontAwesomeIcon icon={faInbox} size="2x" className="me-2" />{" "}
                Pending Requests
              </>
            ),
            value: allRequests.filter((r) => r.status === "Pending").length,
          },
          {
            name: (
              <>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  size="2x"
                  className="text-success me-2"
                />{" "}
                Approved Requests
              </>
            ),
            value: allRequests.filter((r) => r.status === "Approved").length,
          },
          {
            name: (
              <>
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  size="2x"
                  className="text-danger me-2"
                />{" "}
                Rejected Requests
              </>
            ),
            value: allRequests.filter((r) => r.status === "Rejected").length,
          },
          {
            name: (
              <>
                <FontAwesomeIcon icon={faWrench} size="2x" className="me-2" />{" "}
                Completed Requests
              </>
            ),
            value: allRequests.filter((r) => r.status === "Completed").length,
          },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const highUrgencyRequests = pendingRequests.filter(
    (req) => req.urgency === "High"
  );
  const criticalAlerts = highUrgencyRequests.map((req) => ({
    id: req.id,
    message: `Urgent: ${req.request_type} - ${req.reason}`,
    level: "High",
  }));

  const handleApprove = async (requestId) => {
    try {
      await updateRequestStatus(requestId, "Approved");
      setPendingRequests(pendingRequests.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await updateRequestStatus(requestId, "Rejected");
      setPendingRequests(pendingRequests.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Manager Dashboard</h1>

      {criticalAlerts.length > 0 && (
        <div className="alert alert-danger">
          <h4>Critical Alerts</h4>
          <ul>
            {criticalAlerts.map((alert) => (
              <li key={alert.id}>
                <strong>
                  {alert.message} ({alert.level})
                </strong>
              </li>
            ))}
          </ul>
        </div>
      )}

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

      <div className="row mb-3">
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {highUrgencyRequests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.id}</td>
                      <td>{request.request_type}</td>
                      <td>{request.reason}</td>
                      <td>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleApprove(request.id)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleReject(request.id)}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No high urgency requests.</p>
            )}
          </div>
        </div>

        <div className="col-md-6 d-flex flex-column justify-content-between">
          <button
            className="btn text-black mb-3"
            style={{ backgroundColor: "blue" }}
            onClick={() => navigate("/manager/manage-assets")}
          >
            View Assets
          </button>
          <button
            className="btn text-black mb-3"
            style={{ backgroundColor: "green" }}
            onClick={() => navigate("/manager/allocate-asset")}
          >
            Allocate Assets
          </button>
          <button
            className="btn text-black mb-3"
            style={{ backgroundColor: "aqua" }}
            onClick={() => navigate("/manager/approved")}
          >
            Approve/Reject Requests
          </button>
          <button
            className="btn text-black"
            style={{ backgroundColor: "darkgoldenrod" }}
            onClick={() => navigate("/manager/completed-requests")}
          >
            Completed Requests
          </button>
        </div>
      </div>

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

      <div className="row g-2 mb-3">
        <button
          className="btn btn-light col"
          onClick={() => navigate("/manager/pending-requests")}
        >
          New Requests
        </button>
        <button
          className="btn btn-light col"
          onClick={() => navigate("/manager/approved")}
        >
          Approval Reminders
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
