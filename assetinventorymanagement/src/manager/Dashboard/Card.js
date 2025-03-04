// src/components/ui/Card.jsx
import React from "react";

const Card = ({ children }) => {
  return <div className="p-4 bg-white shadow-md rounded-lg">{children}</div>;
};

export default Card;