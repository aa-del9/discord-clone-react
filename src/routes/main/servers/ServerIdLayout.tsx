import MembersSidebar from "@/components/server/members-sidebar";
import ServerSidebar from "@/components/server/server-sidebar";
import { useModal } from "@/hooks/use-model-store";
import { useServerContext } from "@/hooks/use-server-context";
import { useParams } from "react-router-dom";

const ServerIdLayout = () => {
  const params = useParams();
  const serverId = params.serverId;
  const { memberWithServerWithUser } = useServerContext();
  const thisServer = memberWithServerWithUser.find((thisServer) => {
    return thisServer.servers.$id === serverId;
  });
  console.log(thisServer);
  const { isOpen, type } = useModal();
  const showSidebar = isOpen && type === "memberSidebar";
  const role = thisServer?.role ? thisServer.role : "guest";

  return (
    thisServer && (
      <div className="h-full">
        <div className="flex h-full w-60 z-20 flex-col fixed inset-y-0">
          <ServerSidebar memberWithServersAndUser={thisServer} />
        </div>
        <main className="h-full md:pl-60"> server {params?.serverId}</main>
        <div className="flex h-full w-60 z-20 flex-col fixed inset-y-0 right-0">
          {serverId !== "@me" && showSidebar && (
            <MembersSidebar thisMember={thisServer} role={role} />
          )}
        </div>
      </div>
    )
  );
};

export default ServerIdLayout;
