import { Client, Account, Databases, Storage } from "appwrite";

export const appwriteConfig = {
  url: import.meta.env.VITE_APPWRITE_URL, // Your API Endpoint
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID, // Your project ID
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID, // Your database ID
  usersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID, // Your collection ID
  serversCollectionId: import.meta.env.VITE_APPWRITE_SERVERS_COLLECTION_ID, // Your collection ID
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID, // Your storage ID
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.url) // Your API Endpoint
  .setProject(appwriteConfig.projectId); // Your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
