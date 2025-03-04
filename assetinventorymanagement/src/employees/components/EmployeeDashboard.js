// src/components/Dashboard.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link component for navigation
import { fetchRequests, fetchRepairs, fetchAllocatedAssets } from "./api";
import RequestCard from "./RequestCard";

const EmployeeDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [repairs, setRepairs] = useState([]);
  const [assets, setAssets] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestsData = await fetchRequests();
        const repairsData = await fetchRepairs();
        const assetsData = await fetchAllocatedAssets();
        setRequests(requestsData);
        setRepairs(repairsData);
        setAssets(assetsData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Employee Dashboard</h1>

      {/* Section for Requests */}
      <section>
        <h2>Requests</h2>
        <Link to="/requests">
          <button>View All Requests</button>
        </Link>
        {requests.length === 0 ? (
          <p>No requests available.</p>
        ) : (
          requests.map((request) => <RequestCard key={request.id} request={request} />)
        )}
      </section>

      {/* Section for Repairs */}
      <section>
        <h2>Repairs</h2>
        <Link to="/repairs">
          <button>View All Repairs</button>
        </Link>
        {repairs.length === 0 ? (
          <p>No repair requests available.</p>
        ) : (
          <ul>
            {repairs.map((repair) => (
              <li key={repair.id}>
                <strong>{repair.asset}</strong>: {repair.status} (Completion Date: {repair.completionDate})
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Section for Allocated Assets */}
      <section>
        <h2>Allocated Assets</h2>
        <Link to="/assets">
          <button>View All Assets</button>
        </Link>
        {assets.length === 0 ? (
          <p>No assets allocated.</p>
        ) : (
          <ul>
            {assets.map((asset) => (
              <li key={asset.id}>
                <strong>{asset.assetName}</strong>: Allocated on {asset.allocationDate} (Status: {asset.status})
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default EmployeeDashboard;