import React from 'react';

const Filters = ({ onFilterChange }) => {
  const handleFilterChange = (event) => {
    onFilterChange(event.target.value); 
  };

  return (
    <div className="filters">
      <h2>Filter Requests</h2>
      <label>Filter by Urgency:</label>
      <select onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
};

export default Filters;