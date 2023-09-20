import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isAdmin = false;
  let isCustomer = false;
  let status;
  if (token) {
    const decoded = jwtDecode(token);
    const { name, role, _id } = decoded.userInfo;
    localStorage.setItem("userId", _id);
    isAdmin = role.includes(process.env.REACT_APP_ADMIN_ROLE);
    isCustomer = role.includes(process.env.REACT_APP_CUSTOMER_ROLE);
    if (isCustomer) status = "Customer";
    if (isAdmin) {
      status = "Admin";
    }
    localStorage.setItem("role", status);
    return { name, role, status, isCustomer, isAdmin, _id };
  }
  return { name: "", role: [], isCustomer, isAdmin, status, _id: "" };
};

export default useAuth;
