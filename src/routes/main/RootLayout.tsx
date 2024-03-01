import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { getServersOfUser } from "@/lib/appwrite/api";
import { useEffect, useState } from "react";
import { useUserContext } from "@/hooks/use-user-context";
import { MemberWithServerWithUser } from "@/types";

import { Outlet } from "react-router-dom";
import SplashScreen from "@/components/splash-screen";

const RootLayout = () => {
  const { user } = useUserContext();
  const [MemberWithServerWithUser, setMemberWithServerWithUser] = useState<
    MemberWithServerWithUser[]
  >([]);
  const [isLoading, setIsloading] = useState<boolean>(true);
  useEffect(() => {
    getServersOfUser(user?.accountid ? user.accountid : "").then((res) => {
      console.log("[Servers in RootLayout] ", res);
      setMemberWithServerWithUser(!(res === undefined) ? res : []);
      setIsloading(false);
    });
  }, []);
  return !isLoading ? (
    <div className="h-full">
      <div className="flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar
          membersWithServersAndUser={MemberWithServerWithUser}
        />
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
