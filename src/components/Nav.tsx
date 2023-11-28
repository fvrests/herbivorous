"use client";
import { useFirebaseAuth } from "../app/firebase";

import Link from "./Link";

export default function Nav() {
  let user = useFirebaseAuth();
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
