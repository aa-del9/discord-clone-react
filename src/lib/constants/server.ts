export const INITIAL_STATE = {
  servers: [],
  members: [],
  isLoading: false,
  setIsLoading: () => {},
  setServers: () => {},
  setMembers: () => {},
};

export const INITIAL_SERVER = [
  {
    $id: "",
    name: "",
    imageUrl: "",
    inviteCode: "",
    createdAt: "",
    channels: [],
  },
];
