import { useNavigation } from "@react-navigation/native";
import React, { createContext, useEffect, useRef, useState } from "react";
import { RootTabParamList } from "../App";
import firebase from "firebase/compat/app";
import { projectStorage } from "../firebase/config";

interface IAuthContext {
  token: string;
  user: firebase.User |  undefined,
  isLoggedIn: boolean;
  updatePfp: (uri: string) => Promise<void>;
  getCurrentPfp: () => string | null;
  authenticate: (user: firebase.User) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext({
  token: "",
  user: undefined,
  isLoggedIn: false,
  updatePfp: async (uri: string) => {},
  getCurrentPfp: () => {},
  authenticate: async (user: firebase.User) => {},
  logout: () => {},
} as IAuthContext);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<firebase.User>();
  const [pfp, setPfp] = useState(); // to save download bandwidth

  useEffect(() => {
    console.log(token);
  }, [token]);

  async function authenticate(user: firebase.User) {
    const token = await user.getIdToken();
    setToken(token);
    setUser(user);
    console.log("Authenticated");
  }

  function getCurrentUserProfilePicture() {
    if (user) return user.photoURL;
    return null;
  }

  async function updateUserProfilePicture(uri: string) {
    if (user) {
      const image = await uploadImageToCloud(uri, user);
      const downloadUrl = await image.ref.getDownloadURL();
      await user.updateProfile({ photoURL: downloadUrl });
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
  console.log(token);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isLoggedIn: !!token,
        updatePfp: updateUserProfilePicture,
        getCurrentPfp: getCurrentUserProfilePicture,
        authenticate: authenticate,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
