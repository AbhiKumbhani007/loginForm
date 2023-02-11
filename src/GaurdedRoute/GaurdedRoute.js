import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Context/AuthContext";

function GaurdedRoute({ children }) {
  const { authed } = useAuth();
  const location = useLocation();

  return authed || localStorage.getItem("isAuthenticated") || localStorage.getItem("token")? (
    children
  ) : (
    <Navigate to="/" replace state={{ path: location.pathname }} />
  );
}

export default GaurdedRoute;
