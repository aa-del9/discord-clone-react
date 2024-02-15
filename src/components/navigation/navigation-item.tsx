import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";
import { useNavigate, useParams } from "react-router-dom";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
  const params = useParams();
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/servers/${id}`, { state: { name } });
  };
  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button
        onClick={onClick}
        className="group relative flex items-center mb-3"
      >
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all h-0 w-0",

            params?.serverId === id
              ? "w-[4px] h-[36px]"
              : "group-hover:h-[20px] group-hover:w-[4px]"
          )}
        />
        <div
          className={cn(
            "relative group flex justify-center bg-background items-center mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px] bg-indigo-500"
          )}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="image"
              className="object-cover h-full w-full"
            />
          ) : (
            <div className="text-lg">
              {name.charAt(0) + name.split(" ")[1]?.charAt(0)}
            </div>
          )}
        </div>
      </button>
    </ActionTooltip>
  );
};
