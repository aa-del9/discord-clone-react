import { INewMember, INewServer, INewUser, IUserLogin, Server } from "@/types";
import { account, appwriteConfig, databases, storage } from "./config";
import { ID, Query } from "appwrite";
import { v4 as uuidv4 } from "uuid";

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
    console.log(server);

    const uploadedFile = await uploadFile(server.image);

    if (!uploadedFile) throw Error;

    const fileUrl = await getFilePreview(uploadedFile.$id);
    console.log(fileUrl);
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    const newServer = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.serversCollectionId,
      ID.unique(),
      {
        creatorid: server.creatorid,
        name: server.name,
        createdAt: new Date(),
        imageUrl: fileUrl,
        inviteCode: uuidv4(),
      }
    );
    if (!newServer.$id) {
      await deleteFile(uploadedFile.$id);
      console.log("newServer error", newServer);

      throw Error;
    }
    console.log(newServer);

    const newMember = await createMember({
      role: "creator",
      servers: newServer.$id,
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
    console.log(error);

    // return error;
  }
};

export const editServer = async (server: {
  name: string;
  image: File;
  serverid: string;
  oldImageUrl: string;
}) => {
  try {
    if (server.image) {
      console.log(server);
      if (server.image && server.image.name === "imageIsUnchanged.jpg") {
        const updatedServer = await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.serversCollectionId,
          server.serverid,
          {
            name: server.name,
          }
        );
        return updatedServer;
      }
      const uploadedFile = await uploadFile(server.image);
      if (!uploadedFile) throw Error;

      const fileUrl = await getFilePreview(uploadedFile.$id);
      console.log(fileUrl);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      const updatedServer = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.serversCollectionId,
        server.serverid,
        {
          name: server.name,
          imageUrl: fileUrl,
        }
      );

      if (server.oldImageUrl) {
        const url = new URL(server.oldImageUrl);
        console.log(server.oldImageUrl, url);
        const urlParts = url.pathname.split("/");
        const oldImageId = urlParts[urlParts.indexOf("files") + 1];
        console.log(oldImageId);

        if (updatedServer.$id) {
          const res = await deleteFile(oldImageId);
          console.log("old image deletion?", res?.status);
        }
      }
      return updatedServer;
    } else {
      const updatedServer = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.serversCollectionId,
        server.serverid,
        {
          name: server.name,
        }
      );
      return updatedServer;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMembersWithServers = async (userid: string | undefined) => {
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

export const getServersOfUser = async (userid: string | undefined) => {
  const membership = await databases
    .listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.membersCollectionId,
      [
        Query.equal("userid", userid ? userid : ""),
        Query.equal("hasLeaved", false),
      ]
    )
    .then(
      (res) => {
        console.log(res);

        return res;
      },
      (err) => {
        console.log(err);
        return err;
      }
    );
  console.log(membership);

  const servers = membership.documents.map((document) => document.servers);
  console.log(servers);

  return servers;
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

export const checkIfMember = async (userid: string, servers: string) => {
  const member = await databases
    .listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.membersCollectionId,
      [Query.equal("userid", userid), Query.equal("servers", servers)]
    )
    .then(
      async (res) => {
        console.log(res);
        if (res.documents[0] === undefined) {
          return res.documents[0];
        } else {
          if (res.documents[0].hasLeaved === true) {
            await rejoinServer(res.documents[0].$id);
          }
          return res.documents[0];
        }
      },
      (err) => {
        console.log(err);
        return err;
      }
    );
  return member;
};

export const rejoinServer = async (memberID: string) => {
  try {
    const res = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.membersCollectionId,
      memberID,
      {
        hasLeaved: false,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getServerInfoWithMembers = async (serverId: string) => {
  const server = await databases
    .getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.serversCollectionId,
      serverId
    )
    .then(
      async (res) => {
        const members = await databases
          .listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.membersCollectionId,
            [Query.equal("servers", serverId), Query.equal("hasLeaved", false)]
          )
          .then((response) => ({
            server: { ...res },
            members: {
              ...response.documents,
            },
            totalMembers: response.total,
          }));
        return members;
      },
      (err) => {
        console.log(err);
        return err;
      }
    );
  return server;
};

export const getFilePreview = async (fileId: string) => {
  try {
    const fileUrl = await storage.getFilePreview(
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

export const getFileDownload = async (fileId: string) => {
  try {
    const fileUrl = await storage.getFileDownload(
      appwriteConfig.storageId,
      fileId
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
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

export const leaveServer = async (memberID: string) => {
  try {
    const res = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.membersCollectionId,
      memberID,
      {
        hasLeaved: true,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getServerInfoFromInviteCode = async (inviteCode: string) => {
  const server = await databases
    .listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.serversCollectionId,
      [Query.equal("inviteCode", inviteCode)]
    )
    .then(
      (res) => {
        const result: Server = {
          $id: res.documents[0].$id,
          name: res.documents[0].name,
          imageUrl: res.documents[0].imageUrl,
          inviteCode: res.documents[0].inviteCode,
          createdAt: res.documents[0].createdAt,
        };
        return result;
      },
      (err) => {
        console.log(err);
        const emptyServer: Server = {
          $id: "",
          name: "",
          imageUrl: "",
          inviteCode: "",
          createdAt: "",
        };
        return emptyServer;
      }
    );
  console.log(server);
  return server;
};
