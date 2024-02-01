import { useUserContext } from "@/hooks/use-user-context";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const { isAuthenticated } = useUserContext();
  console.log("private user", isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
