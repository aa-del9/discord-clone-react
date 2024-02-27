import { ScrollArea } from "../ui/scroll-area";
import { ServerHeader } from "./server-header";
import { Member, ServerWithMembersWithChannels } from "@/types";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";

interface ServerSidebarProps {
  thisMember: Member;
  role: string;
  serverWithMembersAndChannels: ServerWithMembersWithChannels;
}

export const ServerSidebar = ({
  thisMember,
  role,
  serverWithMembersAndChannels,
}: ServerSidebarProps) => {
  console.log(serverWithMembersAndChannels, "Role=" + role);

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D32] bg-[#F2F3F5]">
      {serverWithMembersAndChannels.server.$id && (
        <ServerHeader
          server={serverWithMembersAndChannels.server}
          role={role}
          thisMember={thisMember}
        />
      )}
      <ScrollArea className="flex-1 px-3">
        <ServerSection
          sectionType="channels"
          channelType="text"
          role={role}
          label="Text Channels"
        />
        {serverWithMembersAndChannels.channels.map((channel) => (
          <ServerChannel
            channel={channel}
            role={role}
            server={serverWithMembersAndChannels.server}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default ServerSidebar;
