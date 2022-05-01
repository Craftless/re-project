import { useNavigation } from "@react-navigation/native";
import React, { createContext, useState } from "react";
import { RootTabParamList } from "../App";

interface IAuthContext {
  token: string;
  isLoggedIn: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
}

const initialState: IAuthContext = {
  token: "",
  isLoggedIn: false,
  authenticate: () => {},
  logout: () => {},
};

export const AuthContext = createContext(initialState);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState("");

  function authenticate(token: string) {
    setToken(token);
    console.log("Authenticated");
  }

  function logout() {
    setToken("");
    console.log("Logging out");
  }
  console.log(token);

  const value = {
    token,
    isLoggedIn: !!token,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
