import { Member } from "@/types";

import MemberItem from "./member-item";

interface ServerSidebarProps {
  serverId: string | undefined;
  thisMember: Member;
  role: string;
  members: Member[];
}

export const MembersSidebar = ({
  serverId,
  thisMember,
  role,
  members,
}: ServerSidebarProps) => {
  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D32] bg-[#F2F3F5] py-4">
      <div>
        <p className="uppercase pl-5 text-xs text-primary dark:text-zinc-400">
          online -
        </p>
      </div>
      {Object.values(members).map((member) => (
        <MemberItem
          username={member.userid?.username}
          imageUrl="../../assets/icons/discord.svg"
          role={role}
        />
      ))}
    </div>
  );
};

export default MembersSidebar;
