import { useUserContext } from "@/hooks/use-user-context";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const { isAuthenticated, setIsInvite } = useUserContext();

  const route = window.location.pathname;
  setIsInvite(route.substring(0, 7) === "/invite" && true);

  console.log("private user", isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={route} />;
};

export default PrivateRoutes;
