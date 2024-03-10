import { useUserContext } from "@/hooks/use-user-context";
import {
  createChannel,
  deleteChannel,
  editChannel,
  getAllServerMembers,
  getServersOfUser,
} from "@/lib/appwrite/api";
import { INITIAL_SERVER, INITIAL_STATE } from "@/lib/constants/server";
import {
  INewChannel,
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

      const res = await getServersOfUser(user!.accountid);
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

  const editServerChannels = async (editedName: string, channelid: string) => {
    try {
      const editedChannel = await editChannel(editedName, channelid);

      if (!editedChannel?.$id) {
        return;
      } else {
        console.log("Channel edited");
        console.log(editedChannel);
        const newMembersWithServer = memberWithServerWithUser.map((member) => {
          if (member.servers.$id === editedChannel.server.$id) {
            console.log("server found:", member.servers);

            const newChannels = member.servers.channels.map((channel) => {
              if (channel.$id === editedChannel.$id) {
                console.log("found", channel);
                return {
                  ...channel,
                  name: editedChannel.name,
                };
              }
              return channel;
            });
            return {
              ...member,
              servers: { ...member.servers, channels: newChannels },
            };
          } else {
            return member;
          }
        });
        console.log(newMembersWithServer);

        setMemberWithServerWithUser(newMembersWithServer);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createServerChannels = async (channel: INewChannel) => {
    //api call
    try {
      const newChannelFromAPI = await createChannel(channel);
      if (!newChannelFromAPI?.$id) {
        return;
      } else {
        console.log("Channel created");
        console.log(newChannelFromAPI);

        console.log(memberWithServerWithUser);
        const newMembersWithServer = memberWithServerWithUser.map((member) => {
          if (member.servers.$id === channel.server) {
            const newChannel = member.servers.channels.push({
              ...newChannelFromAPI,
              name: newChannelFromAPI.name,
              type: newChannelFromAPI.type,
              isDeleted: newChannelFromAPI.isDeleted,
            });
            return { ...member, channels: newChannel };
          }
          return member;
        });
        console.log(newMembersWithServer);
        setMemberWithServerWithUser(newMembersWithServer);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateDeleteChannel = async (channelid: string) => {
    const deletedChannel = await deleteChannel(channelid);
    console.log(deletedChannel);

    if (!deletedChannel?.$id) {
      return false;
    } else {
      console.log("Channel deleted");
      console.log(deletedChannel);
      const newMembersWithServer = memberWithServerWithUser.map((member) => {
        if (member.servers.$id === deletedChannel.server.$id) {
          console.log("server found:", member.servers);

          const newChannels = member.servers.channels.map((channel) => {
            if (channel.$id === deletedChannel.$id) {
              console.log("found", channel);
              return {
                ...channel,
                isDeleted: deletedChannel.isDeleted,
              };
            }
            return channel;
          });
          return {
            ...member,
            servers: { ...member.servers, channels: newChannels },
          };
        } else {
          return member;
        }
      });
      console.log(newMembersWithServer);
      setMemberWithServerWithUser(newMembersWithServer);
      return true;
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
    updateDeleteChannel,
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
