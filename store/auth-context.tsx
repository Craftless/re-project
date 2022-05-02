import { useNavigation } from "@react-navigation/native";
import React, { createContext, useEffect, useRef, useState } from "react";
import { RootTabParamList } from "../App";
import firebase from "firebase/compat/app";
import { projectStorage } from "../firebase/config";

interface IAuthContext {
  token: string;
  user: firebase.User | undefined;
  isLoggedIn: boolean;
  change: string;
  updatePfp: (uri: string) => Promise<void>;
  updateUserDisplayName: (newName: string) => Promise<void>;
  getCurrentPfp: () => string | null;
  getCurrentDisplayName: () => string | null;
  authenticate: (user: firebase.User) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext({
  token: "",
  user: undefined,
  isLoggedIn: false,
  change: "",
  updatePfp: async (uri: string) => {},
  getCurrentPfp: () => {},
  getCurrentDisplayName: () => {},
  authenticate: async (user: firebase.User) => {},
  logout: () => {},
} as IAuthContext);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<firebase.User>();
  const [change, setChange] = useState("");
  const [pfp, setPfp] = useState(); // to save download bandwidth

  // useEffect(() => {
  //   console.log(token);
  // }, [token]);

  async function authenticate(user: firebase.User) {
    const token = await user.getIdToken();
    setToken(token);
    setUser(user);
    console.log("Authenticated");
  }

  function getCurrentUserProfilePicture() {
    if (user) {
      return user.photoURL;
    }

    return null;
  }

  function getCurrentUserDisplayName() {
    if (user) {
      return user.displayName;
    }
    return null;
  }

  async function updateUserProfilePicture(uri: string) {
    if (user) {
      const image = await uploadImageToCloud(uri, user);
      const downloadUrl = await image.ref.getDownloadURL();

      await user.updateProfile({ photoURL: downloadUrl });
    }
  }

  async function updateUserDisplayName(newName: string) {
    if (user) {
      await user.updateProfile({ displayName: newName });
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
