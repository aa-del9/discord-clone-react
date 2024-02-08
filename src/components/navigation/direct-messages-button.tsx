import { useNavigate, useParams } from "react-router-dom";
import { ActionTooltip } from "../action-tooltip";
import { cn } from "@/lib/utils";

const DirectMessagesButton = () => {
  const navigate = useNavigate();
  const params = useParams();

  const onClick = () => {
    navigate("/servers/@me");
  };
  return (
    <ActionTooltip side="right" align="center" label="Direct Messages">
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all h-0 w-0",
            params?.serverId === "@me"
              ? "w-[4px] h-[36px]"
              : "group-hover:h-[20px] group-hover:w-[4px]"
          )}
        />
        <div
          className={cn(
            "relative group flex justify-center items-center mx-3 h-[48px] w-[48px] rounded-[24px] bg-background group-hover:rounded-[16px] group-hover:bg-indigo-500 transition-all overflow-hidden",
            params?.serverId === "@me" &&
              "bg-primary/10 text-primary rounded-[16px] bg-indigo-500"
          )}
        >
          <img src="/assets/icons/discord.svg" alt="discord" className="h-7" />
        </div>
      </button>
    </ActionTooltip>
  );
};

export default DirectMessagesButton;
