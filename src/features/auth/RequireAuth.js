import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {

  const location = useLocation();
  const { role } = useAuth();

  const content = allowedRoles.some((ele) => role.includes(ele)) ? (
    <Outlet />
  ) : (
    <Navigate to="accounts/signin" state={{ from: location }} replace />
  );

  return content;
};
export default RequireAuth;
