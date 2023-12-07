"use client";

interface Props {
  children?: any;
}

import { useAuth } from "../app/firebase-auth";
import { createContext } from "react";

export const UserContext = createContext<User | null>(null);

export default function UserProvider({ children }: Props) {
  let [user, setUser] = useAuth();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
