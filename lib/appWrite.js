import { Account, Avatars, Client, Databases, ID, Query  } from "react-native-appwrite";

export const appWriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.saad.aora",
  projectId: "66cc0fdf0028c68eb686",
  dataBaseId: "66cc1236002c992c251f",
  userCollectionId: "66cc1276002f906e09ee",
  videoCollectionId: "66cc12df001b45da7a0d",
  storageId: "66cc169d00101eea1d45",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appWriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appWriteConfig.projectId) // Your project ID
  .setPlatform(appWriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    // Ensure there's no active session before creating a new one
    await ensureLoggedOut();

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appWriteConfig.dataBaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    // Ensure there's no active session before creating a new one
    await ensureLoggedOut();

    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// Helper function to log out if there's an active session
async function ensureLoggedOut() {
  try {
    const currentSession = await account.get(); // Fetch current session if exists
    if (currentSession) {
      await account.deleteSession("current"); // Log out from the current session
    }
  } catch (error) {
    // If no session exists, this error can be ignored
    if (error.code !== 401) {
      console.log("Error during session check:", error);
      throw error;
    }
  }
}

// Updated getCurrentUser function with async/await
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("No current account found");

    const currentUser = await databases.listDocuments(
      appWriteConfig.dataBaseId,
      appWriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser.documents.length) throw new Error("User not found");
    
    return currentUser.documents[0];
  } catch (error) {
    console.log("Error fetching current user:", error);
    return null; // Return null if any error occurs
  }
};
