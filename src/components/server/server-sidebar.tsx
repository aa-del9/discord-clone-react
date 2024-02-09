import { ServerHeader } from "./server-header";

interface ServerSidebarProps {
  serverId: string | undefined;
}

export const ServerSidebar = ({ serverId }: ServerSidebarProps) => {
  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D32] bg-[#F2F3F5]">
      <ServerHeader server="" role="" />
    </div>
  );
};

export default ServerSidebar;
