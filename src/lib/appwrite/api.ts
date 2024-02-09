import { INewMember, INewServer, INewUser, IUserLogin } from "@/types";
import { account, appwriteConfig, databases, storage } from "./config";
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

export const uploadFile = async (file: File) => {
  const uploadedFile = await storage
    .createFile(appwriteConfig.storageId, ID.unique(), file)
    .then(
      (res) => {
        return res;
      },
      (err) => {
        console.log(err);
        return err;
      }
    );
  return uploadedFile;
};

export const createServer = async (server: INewServer) => {
  try {
    const uploadedFile = await uploadFile(server.image);

    if (!uploadedFile) throw Error;

    const fileUrl = getFilePreview(uploadedFile.$id);

    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }
    console.log(fileUrl);

    const newServer = await databases
      .createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.serversCollectionId,
        ID.unique(),
        {
          creatorid: server.creatorid,
          name: server.name,
          createdAt: new Date(),
          imageUrl: fileUrl,
        }
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
    console.log(newServer);

    if (!newServer) {
      await deleteFile(uploadedFile.$id);
      console.log("newServer error", newServer);

      throw Error;
    }

    const newMember = await createMember({
      role: "creator",
      serverid: newServer.$id,
      userid: server.creatorid,
    }).then(
      (res) => {
        return res;
      },
      (err) => {
        console.log(err);
        return err;
      }
    );
    console.log(!newMember);

    if (!newMember) {
      throw Error;
    }

    return newServer;
  } catch (error) {
    return error;
  }
};

export const getUserServers = async (userid: string | undefined) => {
  const membership = await databases
    .listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.membersCollectionId,
      [Query.equal("userid", userid ? userid : "")]
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
  return membership;
};

export const createMember = async (member: INewMember) => {
  const newMember = await databases
    .createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.membersCollectionId,
      ID.unique(),
      member
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

  return newMember;
};

export const getFilePreview = (fileId: string) => {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
    return Error;
  }
};

export const deleteFile = async (fileId: string) => {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
};
