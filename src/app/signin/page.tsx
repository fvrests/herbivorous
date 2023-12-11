"use client";

import { useContext, useEffect, useState } from "react";
import { signOut } from "../firebase-auth";
import { UserContext } from "../../components/UserProvider";
import Button from "../../components/Button";
import UpdateUserForm from "./UpdateUserForm";
import SignInForm from "./SignInForm";
import Link from "@/components/Link";

export default function SignIn() {
  const { user, isLoading } = useContext(UserContext);
  if (!isLoading) {
    return user ? (
      <>
        <div className="flex flex-col items-center mb-16">
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt={`profile image for ${user.displayName}`}
              className="rounded-full w-20 h-20 mb-4 object-cover shadow-inner"
            />
          )}
          <h2 className="font-bold text-lg">{user.displayName}</h2>
        </div>
        <UpdateUserForm />
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    ) : (
      <>
        <h2 className="font-bold text-lg mb-4">You're not signed in.</h2>
        <p className="mb-8">
          Sign in to save your daily progress and settings.
        </p>
        <SignInForm />
        <div className="text-sm">
          New around here? &nbsp;
          <Link href="/signup">Sign up</Link>
        </div>
      </>
    );
  }
}
