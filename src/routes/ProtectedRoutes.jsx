// src/components/ProtectedRoute.tsx
import { useContext } from "react";
import { Navigate, Outlet } from "react-router";

import { AppContext } from "../context/AppContext";

const ProtectedRoutes = () => {
  const { token } = useContext(AppContext);

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
