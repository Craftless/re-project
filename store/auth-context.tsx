import React, { createContext, useState } from "react";

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
  }

  function logout() {
    setToken("");
  }

  const value = {
    token,
    isLoggedIn: !!token,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
