import { cn } from "@/lib/utils";

const SplashIcon = ({ className }: { className: string }) => {
  return (
    <div className={cn("", className)}>
      <img
        src="/assets/icons/discord.svg"
        alt="loader"
        width={72}
        height={72}
      ></img>
    </div>
  );
};

export default SplashIcon;
