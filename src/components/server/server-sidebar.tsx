import { useEffect, useState } from "react";
import { ServerHeader } from "./server-header";
import { getServerInfoWithMembers } from "@/lib/appwrite/api";
import { ServerWithMembersWithProfiles } from "@/types";
import { useLocation } from "react-router-dom";
import { useUserContext } from "@/hooks/use-user-context";

interface ServerSidebarProps {
  serverId: string | undefined;
}

export const ServerSidebar = ({ serverId }: ServerSidebarProps) => {
  const { state } = useLocation();
  const { user } = useUserContext();
  const [role, setRole] = useState<string>("guest");
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
  console.log(serverWithMembers, "Role=" + role);
  const fetchData = async () => {
    const res = await getServerInfoWithMembers(serverId ? serverId : "");
    console.log(res);
    setServerWithMembers(res);
    console.log(serverWithMembers);
  };
  useEffect(() => {
    const res = serverId !== "@me" ? fetchData() : undefined;
    console.log(res);
  }, [serverId]);

  useEffect(() => {
    setServerWithMembers({
      server: {
        $id: "",
        name: state?.name,
        imageUrl: "",
        inviteCode: "",
        createdAt: "",
      },
      members: [],
    });
  }, [state]);

  useEffect(() => {
    for (let member in serverWithMembers.members) {
      console.log(serverWithMembers.members[member]);
      console.log(
        serverWithMembers.members[member].userid?.$id,
        user?.accountid
      );

      serverWithMembers.members[member].userid?.$id === user?.accountid &&
        setRole(serverWithMembers.members[member].role);
    }
  }, [serverWithMembers]);
  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D32] bg-[#F2F3F5]">
      {serverId !== "@me" && (
        <ServerHeader server={serverWithMembers} role={role} />
      )}
    </div>
  );
};

export default ServerSidebar;
