import SplashIcon from "@/components/shared/splash-icon";
import { useTheme } from "@/hooks/use-theme";

const SplashScreen = () => {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col justify-center items-center h-[100vh] space-y-2">
      <SplashIcon
        color={theme === "dark" ? "#ffffff" : "#000000"}
        className="w-17 h-17 mb-6"
      />
      <div>Did you know?</div>
      <p className="text-sm">Sample text</p>
    </div>
  );
};

export default SplashScreen;
