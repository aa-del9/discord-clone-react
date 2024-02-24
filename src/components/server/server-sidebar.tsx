import { ServerHeader } from "./server-header";
import { Member, ServerWithMembersWithProfiles } from "@/types";

interface ServerSidebarProps {
  serverId: string | undefined;
  thisMember: Member;
  role: string;
  serverWithMembers: ServerWithMembersWithProfiles;
}

export const ServerSidebar = ({
  serverId,
  thisMember,
  role,
  serverWithMembers,
}: ServerSidebarProps) => {
  console.log(serverWithMembers, "Role=" + role);

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D32] bg-[#F2F3F5]">
      {serverId !== "@me" && (
        <ServerHeader
          server={serverWithMembers}
          role={role}
          thisMember={thisMember}
        />
      )}
    </div>
  );
};

export default ServerSidebar;
