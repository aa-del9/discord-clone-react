import { useModal } from "@/hooks/use-model-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Member } from "@/types";

interface MemberItemProps {
  member: Member;
  thisMember: Member;
  username: string | undefined;
  imageUrl: string;
  role: string;
}

const MemberItem = ({
  member,
  thisMember,
  username,
  imageUrl,
  role,
}: MemberItemProps) => {
  const { onOpen } = useModal();
  console.log(thisMember, member);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="cursor-pointer flex w-full px-5 rounded-lg items-center justify-start space-x-4 py-2 hover:bg-background">
          <div className="w-9 h-9 rounded-[50%] bg-indigo-500 object-cover">
            <img src={imageUrl} alt="aw" />
          </div>
          <div className="text-sm text-zinc-300">
            <p>{username}</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left">
        {role === "creator" && member.$id !== thisMember.$id && (
          <DropdownMenuItem
            className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
            onClick={() => {
              onOpen("kickMember", { member });
            }}
          >
            Kick {username}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MemberItem;
