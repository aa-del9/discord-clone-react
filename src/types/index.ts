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
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
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
  day: string;
  month: string;
  year: string;
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
