import { Client, Account, Databases, Storage, Avatars} from 'appwrite'

export const appwriteConfig = {
    url: import.meta.env.VITE_APPWRITE_URL,// Your API Endpoint
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID, // Your project ID
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.url) // Your API Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID

export const account = new Account(client);