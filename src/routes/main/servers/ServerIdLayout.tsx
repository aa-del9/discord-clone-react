import MembersSidebar from "@/components/server/members-sidebar";
import ServerSidebar from "@/components/server/server-sidebar";
import { useUserContext } from "@/hooks/use-user-context";
import { getServerInfoWithMembers } from "@/lib/appwrite/api";
import { Member, ServerWithMembersWithProfiles } from "@/types";
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
  });
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
      setThisMember(serverWithMembers.members[member]);
    }
  }, [serverWithMembers]);

  return (
    <div className="h-full">
      <div className="flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar
          serverId={params.serverId}
          thisMember={thisMember}
          serverWithMembers={serverWithMembers}
          role={role}
        />
      </div>
      <main className="h-full md:pl-60"> server {params?.serverId}</main>
      <div className="flex h-full w-60 z-20 flex-col fixed inset-y-0 right-0">
        {serverId !== "@me" && (
          <MembersSidebar
            serverId={params.serverId}
            members={serverWithMembers.members}
            thisMember={thisMember}
            role={role}
          />
        )}
      </div>
    </div>
  );
};

export default ServerIdLayout;
