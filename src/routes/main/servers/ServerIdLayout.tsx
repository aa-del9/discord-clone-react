import MembersSidebar from "@/components/server/members-sidebar";
import ServerSidebar from "@/components/server/server-sidebar";
import { useLocation, useParams } from "react-router-dom";

const ServerIdLayout = () => {
  const { state } = useLocation();
  const memberWithServersAndUser = state?.memberWithServersAndUser;
  console.log(memberWithServersAndUser);
  const role = memberWithServersAndUser?.role;
  const params = useParams();
  const serverId = params.serverId;

  return (
    <div className="h-full">
      <div className="flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar memberWithServersAndUser={memberWithServersAndUser} />
      </div>
      <main className="h-full md:pl-60"> server {params?.serverId}</main>
      <div className="flex h-full w-60 z-20 flex-col fixed inset-y-0 right-0">
        {serverId !== "@me" && (
          <MembersSidebar thisMember={memberWithServersAndUser} role={role} />
        )}
      </div>
    </div>
  );
};

export default ServerIdLayout;
