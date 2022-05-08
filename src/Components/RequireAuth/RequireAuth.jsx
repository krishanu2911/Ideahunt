import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "Context";

const RequireAuth = ({children}) => {
  const { userLogin } = useAuth();
  const location = useLocation();
  return userLogin ? children : <Navigate state={{ from: location }} to="/login" replace />
}

export { RequireAuth };