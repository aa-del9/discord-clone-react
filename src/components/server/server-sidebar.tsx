import { useEffect, useState } from "react";
import { ServerHeader } from "./server-header";
import { getServerInfoWithMembers } from "@/lib/appwrite/api";
import { ServerWithMembersWithProfiles } from "@/types";
import { useLocation } from "react-router-dom";

interface ServerSidebarProps {
  serverId: string | undefined;
  role?: string;
}

export const ServerSidebar = ({ serverId, role }: ServerSidebarProps) => {
  const { state } = useLocation();
  console.log(state);

  const [serverWithMembers, setServerWithMembers] =
    useState<ServerWithMembersWithProfiles>({
      server: {
        $id: "",
        name: state?.name,
        imageUrl: "",
        inviteCode: "",
        createdAt: "",
      },
      members: [],
    });
  console.log(serverWithMembers);

  useEffect(() => {
    console.log(serverId);
    const res =
      serverId !== "@me"
        ? getServerInfoWithMembers(serverId ? serverId : "").then(
            (response) => {
              console.log(response);
              setServerWithMembers(response);
            }
          )
        : undefined;
    console.log(res);
  }, [serverId]);
  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D32] bg-[#F2F3F5]">
      {serverId !== "@me" && (
        <ServerHeader server={serverWithMembers} role="" />
      )}
    </div>
  );
};

export default ServerSidebar;
