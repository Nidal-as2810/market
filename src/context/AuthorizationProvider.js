import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const AuthorizationProvider = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthorizationProvider;
