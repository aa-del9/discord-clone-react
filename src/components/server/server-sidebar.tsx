import { useEffect } from "react";
import { ServerHeader } from "./server-header";

interface ServerSidebarProps {
  serverId: string | undefined;
  role?: string;
}

export const ServerSidebar = ({ serverId, role }: ServerSidebarProps) => {
  useEffect(() => {
    // getServerInfo(serverId)
  }, []);
  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D32] bg-[#F2F3F5]">
      <ServerHeader server={serverId as string} role="" />
    </div>
  );
};

export default ServerSidebar;
