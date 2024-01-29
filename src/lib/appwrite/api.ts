import { INewUser, IUserLogin } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";
import { ID } from "appwrite";

export const createUserAccount = async (user: INewUser) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.username);

    const newUser = await saveUserToDB({
      accountid: newAccount.$id,
      email: newAccount.email,
      username: newAccount.name,
      password: user.password,
      displayName: user.displayName,
      dob: new Date(Date.UTC(user.year, user.month, user.day)),
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const saveUserToDB = async (user: {
  accountid: string;
  email: string;
  password: string;
  username: string;
  displayName: string;
  dob: Date;
}) => {
  try {
    console.log(user.dob);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user
    );
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (user: IUserLogin) => {
  try {
    const userLogin = await account.createEmailSession(
      user.email,
      user.password
    );
    return userLogin;
  } catch (error) {
    console.log(error);
    return error;
  }
};
