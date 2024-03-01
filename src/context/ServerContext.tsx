import { useUserContext } from "@/hooks/use-user-context";
import { getAllServerMembers, getServersOfUser } from "@/lib/appwrite/api";
import { INITIAL_SERVER, INITIAL_STATE } from "@/lib/constants/server";
import { Member, MemberWithServerWithUser, ServerContextType } from "@/types";
import { createContext, useEffect, useState } from "react";

export const ServerContext = createContext<ServerContextType>(INITIAL_STATE);

const ServerProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [memberWithServerWithUser, setMemberWithServerWithUser] = useState<
    MemberWithServerWithUser[]
  >([INITIAL_SERVER]);
  const [members, setMembers] = useState<Member[]>([]);
  const { user } = useUserContext();
  const getServers = async () => {
    try {
      setIsLoading(true);
      console.log("ca");

      const res = await getServersOfUser(user?.accountid ? user.accountid : "");
      console.log("[Servers in ServerContext] ", res);
      setMemberWithServerWithUser(!(res === undefined) ? res : []);
      setIsLoading(false);
      console.log(res);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const getMembers = async (serverId: string) => {
    try {
      const res = await getAllServerMembers(serverId);
      console.log(res);
      setMembers(res ? res : []);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const value = {
    memberWithServerWithUser,
    setMemberWithServerWithUser,
    members,
    setMembers,
    isLoading,
    setIsLoading,
    getServers,
    getMembers,
  };

  useEffect(() => {
    if (user?.$id) {
      console.log("getting servers...");

      getServers();
    }
  }, [user]);
  return (
    <ServerContext.Provider value={value}>{children}</ServerContext.Provider>
  );
};

export default ServerProvider;
