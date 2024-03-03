import { ModalType, useModal } from "@/hooks/use-model-store";
import { cn } from "@/lib/utils";
import { Channel, MemberWithServerWithUser } from "@/types";
import { useParams } from "react-router-dom";
import { ActionTooltip } from "../action-tooltip";
import { Edit, Lock, Trash } from "lucide-react";

interface ServerChannelProps {
  channel: Channel;
  thisMember: MemberWithServerWithUser;
}

export const ServerChannel = ({ channel, thisMember }: ServerChannelProps) => {
  const { onOpen } = useModal();
  const params = useParams();

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    action === "createChannel"
      ? onOpen(action, {
          channel,
          channelType: channel?.type ? channel.type : undefined,
          member: thisMember,
          isEditChannel: true,
        })
      : onOpen(action, {channel: channel });
  };
  console.log(channel);
  return (
    <button
      //   onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.channelId === channel?.$id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      {/* <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" /> */}
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          true && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {channel?.name}
      </p>
      {thisMember?.role !== "guest" && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit">
            <Edit
              onClick={(e) => onAction(e, "createChannel")}
              className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash
                onClick={(e) => onAction(e, "deleteChannel")}
              className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
        </div>
      )}
      {channel?.name === "general" && (
        <Lock className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400" />
      )}
    </button>
  );
};
