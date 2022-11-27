import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({
  allowed,
  redirectPath = "/",
}: {
  allowed: boolean;
  redirectPath?: string;
}) => {
  if (!allowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
