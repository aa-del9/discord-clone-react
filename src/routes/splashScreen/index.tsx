import SplashIcon from "@/components/shared/SplashIcon";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/servers/@me");
    }, 1500);
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-[100vh] space-y-2">
      <SplashIcon className="w-17 h-17 mb-6" />
      <div>Did you know?</div>
      <p className="text-sm">Sample text</p>
    </div>
  );
};

export default SplashScreen;
