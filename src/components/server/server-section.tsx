import { useModal } from "@/hooks/use-model-store";
import { ActionTooltip } from "../action-tooltip";
import { Plus } from "lucide-react";
import { MemberWithServerWithUser } from "@/types";

interface ServerSectionProps {
  label: string;
  thisMember: MemberWithServerWithUser;
  sectionType: "channels" | "members";
  channelType?: "text" | "voice";
}

export const ServerSection = ({
  label,
  thisMember,
  sectionType,
  channelType,
}: ServerSectionProps) => {
  const { onOpen } = useModal();

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {thisMember.role !== "guest" && sectionType === "channels" && (
        <ActionTooltip label="Create Channel" side="top">
          <button
            onClick={() =>
              onOpen("createChannel", {
                channelType,
                member: thisMember,
              })
            }
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Plus className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};
