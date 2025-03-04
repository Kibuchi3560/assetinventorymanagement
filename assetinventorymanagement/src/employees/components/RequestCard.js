import React from "react";

const RequestCard = ({ request }) => {
  return (
    <div style={styles.card}>
      <h3>{request.reason}</h3> {/* Changed from description */}
      <p>Status: {request.status}</p>
      <p>Requested on: {request.request_date}</p> {/* Changed from date */}
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
  },
};

export default RequestCard;