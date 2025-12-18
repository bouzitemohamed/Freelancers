import React, { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { loading, auth } = useContext(AuthContext);
  const location = useLocation();

  // Still loading authentication status
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // Not authenticated → redirect to login
  if (!auth) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // Authenticated → Show page
  return <>{children}</>;
};

export default ProtectedRoutes;
