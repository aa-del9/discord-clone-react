import { useUserContext } from "@/hooks/use-user-context";
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: isUserLoading } = useUserContext();
  useEffect(() => {
    if (isUserLoading) {
      return;
    }

    if (isAuthenticated) {
      navigate("/servers/@me");
    }
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] bg-[url('/assets/background.png')] bg-cover">
      <Outlet />
    </div>
  );
};

export default AuthPage;
