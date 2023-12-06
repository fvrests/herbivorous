"use client";
import { useAuth } from "../app/firebase-auth";
import { useEffect } from "react";

import Link from "./Link";

export default function Nav() {
  let [user] = useAuth();
  useEffect(() => {
    console.log("from nav", user);
  }, [user]);

  return (
    <nav className="flex items-center justify-between mb-16">
      <a href="/">
        <h1 className="font-bold text-xl">Herbivorous</h1>
      </a>
      <Link href="/signin">
        {user?.displayName ? user?.displayName : "Sign in"}
      </Link>
    </nav>
  );
}
