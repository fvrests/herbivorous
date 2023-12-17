"use client";
import { useContext } from "react";
import { UserContext } from "../components/UserProvider";

import Link from "./Link";

export default function Nav() {
  const { user, isLoading } = useContext(UserContext);

  return (
    <nav className="flex items-center justify-between mb-16">
      <a href="/">
        <h1 className="font-bold text-xl">Herbivorous</h1>
      </a>
      {!isLoading && (
        <Link href="/signin">
          {user?.displayName ? user?.displayName : "Not signed in"}
        </Link>
      )}
    </nav>
  );
}
