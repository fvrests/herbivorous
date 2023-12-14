"use client";

interface Props {
  children?: any;
}

import { useAuth } from "../app/firebase-auth";
import { createContext } from "react";

interface UserContext {
  user: User | null;
  setUser: (userInfo: User) => void;
  isLoading: boolean;
}
export const UserContext = createContext<UserContext>({
  user: null,
  setUser: (userInfo: User) => {},
  isLoading: true,
});

export default function UserProvider({ children }: Props) {
  let { user, setUser, isLoading } = useAuth();

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
