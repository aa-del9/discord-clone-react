import { useUserContext } from "@/hooks/use-user-context";
import {
  createChannel,
  editChannel,
  getAllServerMembers,
  getServersOfUser,
} from "@/lib/appwrite/api";
import { INITIAL_SERVER, INITIAL_STATE } from "@/lib/constants/server";
import {
  Channel,
  ChannelFormValue,
  Member,
  MemberWithServerWithUser,
  ServerContextType,
  ServerWithChannels,
} from "@/types";
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

  const editServerChannels = async (editedName: string, channel: Channel) => {
    try {
      const res = await editChannel(editedName, channel);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const createServerChannels = async (
    values: ChannelFormValue,
    member: Member
  ) => {
    //api call
    try {
      const newChannelFromAPI = await createChannel({
        name: values.name,
        type: values.channelType,
        server: member?.servers?.$id ? member.servers.$id : "",
        creatorid: member?.$id ? member.$id : "",
      });
      if (!newChannelFromAPI?.$id) {
        return;
      } else {
        console.log("Channel created");
        console.log(newChannelFromAPI);

        console.log(memberWithServerWithUser);
        const newServers = memberWithServerWithUser.map((server) => {
          if (server.servers.$id === member?.servers?.$id) {
            const newChannel = server.servers.channels.push({
              $id: newChannelFromAPI.$id,
              name: newChannelFromAPI.name,
              type: newChannelFromAPI.type,
            });
            return { ...server, channels: newChannel };
          }
          return server;
        });
        console.log(newServers);
        setMemberWithServerWithUser(newServers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateServerInfo = (server: ServerWithChannels) => {
    const newServers = memberWithServerWithUser.map((member) => {
      if (member.servers.$id === server.$id) {
        return { ...member, servers: server };
      }
      return member;
    });
    setMemberWithServerWithUser(newServers);
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
    createServerChannels,
    updateServerInfo,
    editServerChannels,
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
