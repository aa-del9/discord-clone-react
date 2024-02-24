import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { getServersOfUser } from "@/lib/appwrite/api";
import { useEffect, useState } from "react";
import { useUserContext } from "@/hooks/use-user-context";
import { Server } from "@/types";

import { Outlet } from "react-router-dom";
import SplashScreen from "@/components/splash-screen";

const RootLayout = () => {
  const { user } = useUserContext();
  const [servers, setServers] = useState<Server[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(true);
  useEffect(() => {
    getServersOfUser(user?.accountid ? user.accountid : "").then((res) => {
      console.log("[Servers in RootLayout] ", res);
      setServers(!(res === undefined) ? res : []);
      setIsloading(false);
    });
  }, []);
  return !isLoading ? (
    <div className="h-full">
      <div className="flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar servers={servers} />
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
