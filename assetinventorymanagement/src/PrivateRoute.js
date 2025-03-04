import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element, roles, ...rest }) => {
  const { user, role } = useSelector((state) => state.auth);
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (roles && !roles.includes(role)) {
    return <Navigate to="/" />;
  }
  return <Route {...rest} element={element} />;
};


export default PrivateRoute;