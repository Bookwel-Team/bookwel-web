import { createContext } from "react";
import { TAuthStore } from "./types";
import { User } from "firebase/auth";

export const AuthContext = createContext<TAuthStore>({
  user: {} as User,
  setUser: () => {},
});
