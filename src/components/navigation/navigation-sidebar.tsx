import { redirect, useNavigate } from "react-router-dom";
import { useUserContext } from "@/hooks/use-user-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import NavigationAction from "./navigation-action";
import { NavigationItem } from "./navigation-item";
import DirectMessagesButton from "./direct-messages-button";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect, useState } from "react";
import { INITIAL_USER } from "@/lib/constants/auth";
import { ModeToggle } from "../ui/mode-toggle";
import { getUserServers } from "@/lib/appwrite/api";

export const NavigationSidebar = () => {
  const { user, setIsAuthenticated, setUser } = useUserContext();
  const { mutate: signOut, isSuccess, isError } = useSignOutAccount();
  const navigate = useNavigate();
  const [servers, setServers] = useState<any>([]);
  useEffect(() => {
    getUserServers(user?.accountid ? user.accountid : "").then((res) => {
      console.log(res.documents);
      setServers(res.documents);
    });
  }, []);
  // const servers = [
  //   {
  //     id: "h9h9w8",
  //     name: "server1",
  //     imageUrl: "/assets/icons/discord.svg",
  //   },
  // ];

  if (!user) redirect("/login");
  useEffect(() => {
    if (isError) console.log("error signing out");
    if (isSuccess) {
      setIsAuthenticated(false);
      setUser(INITIAL_USER);
      navigate("/login");
    }
  }, [isSuccess, isError]);
  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
      <DirectMessagesButton />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />

      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <NavigationItem
            key={server.serverid.$id}
            id={server.serverid.$id}
            imageUrl={server.serverid.imageUrl}
            name={server.serverid.name}
          />
        ))}
      </ScrollArea>
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <div className="rounded-md opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <ModeToggle />
      </div>
      <Button
        onClick={() => {
          signOut();
        }}
      >
        Sign out
      </Button>
    </div>
  );
};
