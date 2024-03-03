import { INITIAL_USER } from "./auth";

export const INITIAL_STATE = {
  memberWithServerWithUser: [],
  members: [],
  isLoading: false,
  setIsLoading: () => {},
  setMemberWithServerWithUser: () => {},
  setMembers: () => {},
  getServers: async () => false as boolean,
  getMembers: async () => false as boolean,
  createServerChannels: () => {},
  updateServerInfo: () => {},
  editServerChannels: () => {},
};

export const INITIAL_SERVER = {
  $id: "",
  userid: INITIAL_USER,
  role: "",
  servers: {
    $id: "",
    name: "",
    imageUrl: "",
    inviteCode: "",
    createdAt: "",
    channels: [],
  },
  hasLeaved: false,
};
