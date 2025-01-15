import { getAccessToken } from "@/lib/auth";
import { ReactNode } from "react";
import { Navigate } from "react-router";

interface Props {
  children: ReactNode;
  redirectTo?: string;
}

const RedirectIfAuthenticated = ({ children, redirectTo = "/home" }: Props) => {
  const isAccessToken = getAccessToken();

  if (isAccessToken) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default RedirectIfAuthenticated;
