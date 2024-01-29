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

export type INewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
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

export type IUser = {
  accountid: string;
  username: string;
  email: string;
  password: string;
  displayName: string;
  dob: Date | string;
};

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

export type AuthSuccessResponse = {
  $id: string;
  $createdAt: Date | string;
  $updatedAt: Date | string;
  name: string;
  registration: string;
  status: boolean;
  labels: Array<any>;
  passwordUpdate: Date | string;
  email: string;
  phone: string;
  emailVerification: boolean;
  phoneVerification: boolean;
  prefs: Date | string;
  accessedAt: Date | string;
};
