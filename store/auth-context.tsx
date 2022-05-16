import { Alert } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { projectStorage } from "../firebase/config";
import { getCurrentUserDisplayNameFromUser, getCurrentUserProfilePictureFromUser, updateUserProfile } from "../util/auth";

export interface IAuthContext {
  token: string;
  user: firebase.User | undefined;
  isLoggedIn: boolean;
  change: string;
  pfpCacheKey: string;
  updatePfp: (uri: string) => Promise<void>;
  updateUserDisplayName: (newName: string) => Promise<void>;
  getCurrentPfp: () => string | undefined;
  getCurrentDisplayName: () => string | null;
  authenticate: (user: firebase.User) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  change: "",
  updatePfp: async (uri: string) => {},
  getCurrentDisplayName: () => {},
  authenticate: async (user: firebase.User) => {},
  logout: () => {},
} as IAuthContext);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<firebase.User>();
  const [change, setChange] = useState("");
  const [pfpCacheKey, setPfpCacheKey] = useState("");

  useEffect(() => {
    console.log(`KEY: ${pfpCacheKey}`);
  }, [pfpCacheKey]);

  async function authenticate(user: firebase.User) {
    const token = await user.getIdToken();
    setToken(token);
    setUser(user);
    console.log("Authenticated");
  }

  function getCurrentUserProfilePicture() {
    if (user) {
      getCurrentUserProfilePictureFromUser(user);
    }
    Alert.alert("Cannot get profile picture of a user that does not exist!");
    return undefined;
  }

  function getCurrentUserDisplayName() {
    if (user) {
      return getCurrentUserDisplayNameFromUser(user);
    }
    Alert.alert("Cannot get display name of a user that does not exist!");
    return null;
  }

  async function updateUserProfilePicture(uri: string) {
    if (user) {
      const image = await uploadImageToCloud(uri, user);
      const downloadUrl = await image.ref.getDownloadURL();

      await updateUserProfile(user, { photoURL: downloadUrl });
      setPfpCacheKey(Math.random().toFixed(6).toString().replace(".", ""));
    }
  }

  async function updateUserDisplayName(newName: string) {
    if (user) {
      await updateUserProfile(user, { displayName: newName });
    }
  }

  async function uploadImageToCloud(uri: string, user: firebase.User) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const uploadPath = `users/${user.uid}/pfp`;

    const image = await projectStorage.ref(uploadPath).put(blob);
    return image;
  }

  function logout() {
    setToken("");
    console.log("Logging out");
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        change,
        isLoggedIn: !!token,
        pfpCacheKey,
        updatePfp: updateUserProfilePicture,
        updateUserDisplayName,
        getCurrentPfp: getCurrentUserProfilePicture,
        getCurrentDisplayName: getCurrentUserDisplayName,
        authenticate: authenticate,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
