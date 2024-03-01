import { Outlet } from "react-router-dom";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import SplashScreen from "@/components/splash-screen";
import { useServerContext } from "@/hooks/use-server-context";

const RootLayout = () => {
  const { memberWithServerWithUser: servers, isLoading } = useServerContext();

  return !isLoading ? (
    <div className="h-full">
      <div className="flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar membersWithServersAndUser={servers} />
      </div>
      <main className="md:pl-[72px] h-full">
        <Outlet />
      </main>
    </div>
  ) : (
    <SplashScreen />
  );
};

export default RootLayout;
