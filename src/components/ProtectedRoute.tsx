import { getAccessToken } from "@/lib/auth";
import { ReactNode } from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAccessToken = getAccessToken();

  if (!isAccessToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
