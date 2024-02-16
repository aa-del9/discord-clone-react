import React from "react";

export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export type INewServer = {
  name: string;
  image: File;
  creatorid: string | undefined;
  createdAt: Date;
};

export type IContextType = {
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

export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUser =
  | {
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
};

type Member = {
  $id: string;
  username: string;
  imageUrl: string;
  role: string;
};
export type INewMember = {
  role: string;
  userid: string | undefined;
  servers: string;
};

export type ServerWithMembersWithProfiles = {
  server: Server;
  members: (Member & { profile: IUser })[];
};
