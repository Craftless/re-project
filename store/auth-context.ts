import { useContext } from "react";

interface IAuthContext {
  token: string;
  isLoggedIn: boolean;
  authenticate: () => void;
  logout: () => void;
}

const initialState: IAuthContext = {
  token: "",
  isLoggedIn: false,
  authenticate: () => {},
  logout: () => {},
};

