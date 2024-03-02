import { ScrollArea } from "../ui/scroll-area";
import { ServerHeader } from "./server-header";
import { MemberWithServerWithUser } from "@/types";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";

interface ServerSidebarProps {
  thisMember: MemberWithServerWithUser;
}

export const ServerSidebar = ({ thisMember }: ServerSidebarProps) => {
  console.log(thisMember, "Role=" + thisMember?.role);

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D32] bg-[#F2F3F5]">
      <ServerHeader memberWithServersAndUser={thisMember} />

      <ScrollArea className="flex-1 px-3">
        <ServerSection
          sectionType="channels"
          channelType="text"
          thisMember={thisMember}
          label="Text Channels"
        />
        {thisMember?.servers?.channels?.map(
          (channel) =>
            channel.type === "text" && (
              <ServerChannel channel={channel} thisMember={thisMember} />
            )
        )}
        <ServerSection
          sectionType="channels"
          channelType="voice"
          thisMember={thisMember}
          label="Voice Channels"
        />

        {thisMember?.servers?.channels?.map(
          (channel) =>
            channel.type === "voice" && (
              <ServerChannel channel={channel} thisMember={thisMember} />
            )
        )}
      </ScrollArea>
    </div>
  );
};

export default ServerSidebar;
