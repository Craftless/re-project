import { useNavigation } from "@react-navigation/native";
import React, { createContext, useEffect, useRef, useState } from "react";
import firebase from "firebase/compat/app";
import { projectStorage } from "../firebase/config";
import { writeUserData } from "../util/leaderboard";
import { User } from "firebase/auth";

interface IAuthContext {
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
    if (user?.photoURL) {
      return user.photoURL;
    }

    return undefined;
  }

  function getCurrentUserDisplayName() {
    if (user) {
      return user.displayName;
    }
    return null;
  }

  function getCurrentUserDisplayNameOrEmailNonNull(user: firebase.User) {
    return getCurrentUserDisplayName() || user.email || "None";
  }
  
  function getCurrentUserProfilePictureNonNull(user: firebase.User) {
    return getCurrentUserProfilePicture() || "None";
  }

  async function updateUserProfilePicture(uri: string) {
    if (user) {
      const image = await uploadImageToCloud(uri, user);
      const downloadUrl = await image.ref.getDownloadURL();

      await updateUserProfile({ photoURL: downloadUrl });
      setPfpCacheKey(Math.random().toFixed(6).toString().replace(".", ""));
    }
  }

  async function updateUserDisplayName(newName: string) {
    if (user) {
      await updateUserProfile({ displayName: newName });
    }
  }

  async function updateUserProfile(object: {
    displayName?: string;
    photoURL?: string;
  }) {
    if (user) {
      await user.updateProfile({
        displayName: object.displayName || undefined,
        photoURL: object.photoURL || undefined,
      });
      await writeUserData({
        displayName: getCurrentUserDisplayNameOrEmailNonNull(user),
        pfpUrl: getCurrentUserProfilePictureNonNull(user),
      });
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
