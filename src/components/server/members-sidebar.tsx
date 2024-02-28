import { Member } from "@/types";

import MemberItem from "./member-item";
import { useEffect, useState } from "react";
import { getAllServerMembers } from "@/lib/appwrite/api";
import { useParams } from "react-router-dom";

interface MemberSidebarProps {
  thisMember: Member;
  role: string;
}

export const MembersSidebar = ({ thisMember, role }: MemberSidebarProps) => {
  const { serverId } = useParams();
  const [members, setMembers] = useState<Member[]>([]);

  const fetchData = async () => {
    console.log(serverId);

    const res = await getAllServerMembers(serverId ? serverId : "");
    console.log(res);
    setMembers(res ? res : []);
  };

  useEffect(() => {
    setMembers([]);
    const res = serverId !== "@me" ? fetchData() : undefined;
    console.log(res);
  }, [serverId]);

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D32] bg-[#F2F3F5] py-4">
      <div>
        <p className="uppercase pl-5 text-xs text-primary dark:text-zinc-400">
          total - {members.length}
        </p>
      </div>
      {Object.values(members).map((member) => (
        <MemberItem
          member={member}
          thisMember={thisMember}
          username={member.userid?.username}
          imageUrl="../../assets/icons/discord.svg"
          role={role}
        />
      ))}
    </div>
  );
};

export default MembersSidebar;
