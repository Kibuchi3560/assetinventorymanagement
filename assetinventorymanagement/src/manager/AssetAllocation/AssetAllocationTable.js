import React, { useEffect } from 'react';

const AssetAllocationTable = ({ allocations }) => {
  useEffect(() => {
    console.log("Allocations Data:", allocations);
  }, [allocations]);

  if (!Array.isArray(allocations)) {
    return <div>No allocations available</div>;
  }

  return (
    <div>
      <h2>Asset Allocations</h2>
      <table>
        <thead>
          <tr>
            <th>Asset</th>
            <th>Employee</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {allocations.length > 0 ? (
            allocations.map((allocation) => (
              <tr key={allocation.id}>
                <td>{allocation.assetName}</td>
                <td>{allocation.employeeName}</td>
                <td>{allocation.quantity}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="3">No allocations available</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AssetAllocationTable