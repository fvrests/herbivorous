"use client";

interface Props {
  children?: any;
}

import { useAuth } from "../app/firebase-auth";
import { createContext } from "react";

interface UserContext {
  user: User | null;
  setUser: (userInfo: User) => void;
}
export const UserContext = createContext<UserContext>({
  user: null,
  setUser: (userInfo: User) => {},
});

export default function UserProvider({ children }: Props) {
  let [user, setUser] = useAuth();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
