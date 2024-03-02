import MembersSidebar from "@/components/server/members-sidebar";
import ServerSidebar from "@/components/server/server-sidebar";
import { useModal } from "@/hooks/use-model-store";
import { useServerContext } from "@/hooks/use-server-context";
import { useParams } from "react-router-dom";

const ServerIdLayout = () => {
  const params = useParams();
  const serverId = params.serverId;
  const { memberWithServerWithUser } = useServerContext();
  const thisMember = memberWithServerWithUser.find((thisMember) => {
    return thisMember.servers.$id === serverId;
  });
  console.log(thisMember);
  const { isOpen, type } = useModal();
  const showSidebar = isOpen && type === "memberSidebar";
  const role = thisMember?.role ? thisMember.role : "guest";

  return (
    thisMember && (
      <div className="h-full">
        <div className="flex h-full w-60 z-20 flex-col fixed inset-y-0">
          <ServerSidebar thisMember={thisMember} />
        </div>
        <main className="h-full md:pl-60"> server {params?.serverId}</main>
        <div className="flex h-full w-60 z-20 flex-col fixed inset-y-0 right-0">
          {serverId !== "@me" && showSidebar && (
            <MembersSidebar thisMember={thisMember} role={role} />
          )}
        </div>
      </div>
    )
  );
};

export default ServerIdLayout;
