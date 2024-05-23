import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthChecker } from './AuthChecker';


const ProtectedRoute = ({ component: Component, ...rest }) => {

  let isAuthenticated = AuthChecker();
  console.log("ProtectedRoute isAuthenticated: ", isAuthenticated);
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/404" />;
};

export default ProtectedRoute;