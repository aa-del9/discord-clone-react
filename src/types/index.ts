import React from "react";

export type INewServer = {
  name: string;
  image: File;
  creatorid: string | undefined;
  createdAt: Date;
};

export type UserContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
  isInvite: boolean;
  setIsInvite: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ServerContextType = {
  memberWithServerWithUser: MemberWithServerWithUser[];
  members: Member[];
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setMemberWithServerWithUser: React.Dispatch<
    React.SetStateAction<MemberWithServerWithUser[]>
  >;
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  getServers: () => Promise<boolean>;
  getMembers: (serverId: string) => Promise<boolean>;
  createServerChannels: (values: ChannelFormValue, member: Member) => void;
  updateServerInfo: (server: ServerWithChannels) => void;
  editServerChannels: (editedName: string, channel: Channel) => void;
};

export type IUser =
  | {
      $id: string;
      accountid: string;
      username: string;
      email: string;
      displayName: string;
      dob: Date | string;
    }
  | undefined;

export type IUserLogin = {
  email: string;
  password: string;
};

export type INewUser = {
  email: string;
  displayName: string;
  username: string;
  password: string;
  day: number;
  month: number;
  year: number;
};

export type Server = {
  $id: string;
  name: string;
  imageUrl: string;
  inviteCode: string | null;
  createdAt: Date | string;
  channels?: Channel[];
};

export type ServerWithChannels = {
  $id: string;
  name: string;
  imageUrl: string;
  inviteCode: string | null;
  createdAt: Date | string;
  channels: Channel[];
};

export type Member = {
  $id: string;
  userid: IUser;
  role: string;
  servers?: Server;
  hasLeaved: boolean;
};
export type INewMember = {
  role: string;
  userid: string | undefined;
  servers: string;
};

export type MemberWithServerWithUser = {
  $id: string;
  userid: IUser;
  role: string;
  servers: ServerWithChannels;
  hasLeaved: boolean;
};

// export type ServerWithMembersWithChannels = {
//   server: Server;
//   members: Member[];
//   channels: Channel[];
//   totalMembers: number;
// };

export type INewChannel = {
  name: string;
  server: string;
  creatorid: string;
  type: string;
};

export type Channel = {
  $id: string;
  name: string;
  creatorid?: string;
  type: string;
};

export type ChannelFormValue = {
  name: string;
  type: string;
};
