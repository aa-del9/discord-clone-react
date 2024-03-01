import SplashScreen from "@/components/splash-screen";
import { useUserContext } from "@/hooks/use-user-context";
import { getAllServerMembers, getServersOfUser } from "@/lib/appwrite/api";
import { INITIAL_SERVER, INITIAL_STATE } from "@/lib/constants/server";
import { Member, ServerContextType, ServerWithChannels } from "@/types";
import { createContext, useState } from "react";

export const ServerContext = createContext<ServerContextType>(INITIAL_STATE);

const ServerProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [servers, setServers] = useState<ServerWithChannels[]>(INITIAL_SERVER);
  const [members, setMembers] = useState<Member[]>([]);
  const { user } = useUserContext();
  const getServers = async () => {
    try {
      const res = await getServersOfUser(user?.accountid ? user.accountid : "");
      console.log("[Servers in ServerContext] ", res);
      setServers(!(res === undefined) ? res : []);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getMembers = async (serverId: string) => {
    try {
      const res = await getAllServerMembers(serverId);
      console.log(res);
      setMembers(res ? res : []);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    servers,
    setServers,
    members,
    setMembers,
    isLoading,
    setIsLoading,
    getServers,
    getMembers,
  };
  return (
    <ServerContext.Provider value={value}>
      {isLoading ? <SplashScreen /> : children}
    </ServerContext.Provider>
  );
};

export default ServerProvider;
