import MembersSidebar from "@/components/server/members-sidebar";
import ServerSidebar from "@/components/server/server-sidebar";
import { useUserContext } from "@/hooks/use-user-context";
import { getServerInfoWithMembersAndChannels } from "@/lib/appwrite/api";
import { Member, ServerWithMembersWithChannels } from "@/types";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const ServerIdLayout = () => {
  const { state } = useLocation();
  const params = useParams();
  const serverId = params.serverId;
  const { user } = useUserContext();
  const [role, setRole] = useState<string>("guest");
  const [thisMember, setThisMember] = useState<Member>({
    $id: "",
    username: "",
    userid: user,
    role: "",
    hasLeaved: false,
  });
  const [serverWithMembersAndChannels, setServerWithMembersAndChannels] =
    useState<ServerWithMembersWithChannels>({
      server: {
        $id: "",
        name: state?.name,
        imageUrl: "",
        inviteCode: "",
        createdAt: "",
      },
      channels: [],
      members: [],
      totalMembers: 0,
    });
  console.log(serverWithMembersAndChannels, "Role=" + role);
  const fetchData = async () => {
    const res = await getServerInfoWithMembersAndChannels(
      serverId ? serverId : ""
    );
    console.log(res);
    setServerWithMembersAndChannels(res);
    console.log(serverWithMembersAndChannels);
  };

  useEffect(() => {
    setRole("guest");
    const res = serverId !== "@me" ? fetchData() : undefined;
    console.log(res);
  }, [serverId]);

  useEffect(() => {
    setServerWithMembersAndChannels({
      server: {
        $id: "",
        name: state?.name,
        imageUrl: "",
        inviteCode: "",
        createdAt: "",
      },
      channels: [],
      members: [],
      totalMembers: 0,
    });
  }, [state]);

  useEffect(() => {
    for (let member in serverWithMembersAndChannels.members) {
      if (
        serverWithMembersAndChannels.members[member].userid?.$id ===
        user?.accountid
      ) {
        console.log(serverWithMembersAndChannels.members[member]);
        console.log(
          serverWithMembersAndChannels.members[member].userid?.$id,
          user?.accountid
        );
        setRole(serverWithMembersAndChannels.members[member].role);
        setThisMember(serverWithMembersAndChannels.members[member]);
      }
    }
  }, [serverWithMembersAndChannels]);

  return (
    <div className="h-full">
      <div className="flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar
          thisMember={thisMember}
          serverWithMembersAndChannels={serverWithMembersAndChannels}
          role={role}
        />
      </div>
      <main className="h-full md:pl-60"> server {params?.serverId}</main>
      <div className="flex h-full w-60 z-20 flex-col fixed inset-y-0 right-0">
        {serverId !== "@me" && (
          <MembersSidebar
            members={serverWithMembersAndChannels.members}
            thisMember={thisMember}
            role={role}
            totalMembers={serverWithMembersAndChannels.totalMembers}
          />
        )}
      </div>
    </div>
  );
};

export default ServerIdLayout;
