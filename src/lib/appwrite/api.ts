import { INewUser, IUserLogin } from "@/types";
import { account } from "./config";
import { ID } from "appwrite";

export const createUserAccount = async (user: INewUser) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.username
    );
    return newAccount;
  } catch (error) {
    console.log(error);
    return error;
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
