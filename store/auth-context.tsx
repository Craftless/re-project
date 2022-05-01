import { useNavigation } from "@react-navigation/native";
import React, { createContext, useEffect, useState } from "react";
import { RootTabParamList } from "../App";

interface IAuthContext {
  token: string;
  isLoggedIn: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  authenticate: (token: string) => {},
  logout: () => {},
});

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState("");

  useEffect(() => {
    console.log(token);
  }, [token]);

  function authenticate(token: string) {
    setToken(token);
    console.log("Authenticated");
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
        isLoggedIn: !!token,
        authenticate: authenticate,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
