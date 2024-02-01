import { INewUser, IUserLogin } from "@/types";
import { account, appwriteConfig, databases } from "./config";
import { ID, Query } from "appwrite";

export const createUserAccount = async (user: INewUser) => {
  const newAccount = await account
    .create(ID.unique(), user.email, user.password, user.username)
    .then(
      (res) => {
        return res;
      },
      (err) => {
        console.log(err);
        return err;
      }
    );

  //const avatarUrl = avatars.getInitials(user.username);

  const newUser = await saveUserToDB({
    accountid: newAccount.$id,
    email: newAccount.email,
    username: newAccount.name,
    displayName: user.displayName,
    dob: new Date(Date.UTC(user.year, user.month, user.day)),
  }).then(
    (res) => {
      return res;
    },
    (err) => {
      console.log(err);
      return err;
    }
  );

  return newUser;
};

export const saveUserToDB = async (user: {
  accountid: string;
  email: string;
  username: string;
  displayName: string;
  dob: Date;
}) => {
  const newUser = await databases
    .createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user
    )
    .then(
      (res) => {
        return res;
      },
      (err) => {
        console.log(err);
        return err;
      }
    );
  return newUser;
};

export const signInAccount = async (user: IUserLogin) => {
  const session = await account
    .createEmailSession(user.email, user.password)
    .then(
      (res) => {
        return res;
      },
      (err) => {
        console.log(err);
        return err;
      }
    );
  return session;
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountid", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const signOutAccount = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log(error);
    return error;
  }
};
