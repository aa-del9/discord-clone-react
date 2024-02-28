import { ScrollArea } from "../ui/scroll-area";
import { ServerHeader } from "./server-header";
import { MemberWithServerWithUser } from "@/types";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";

interface ServerSidebarProps {
  memberWithServersAndUser: MemberWithServerWithUser;
}

export const ServerSidebar = ({
  memberWithServersAndUser,
}: ServerSidebarProps) => {
  console.log(
    memberWithServersAndUser,
    "Role=" + memberWithServersAndUser?.role
  );

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D32] bg-[#F2F3F5]">
      <ServerHeader memberWithServersAndUser={memberWithServersAndUser} />

      <ScrollArea className="flex-1 px-3">
        <ServerSection
          sectionType="channels"
          channelType="text"
          role={memberWithServersAndUser?.role}
          label="Text Channels"
        />
        {memberWithServersAndUser?.servers?.channels?.map((channel) => (
          <ServerChannel
            channel={channel}
            role={memberWithServersAndUser?.role}
            server={memberWithServersAndUser?.servers}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default ServerSidebar;
