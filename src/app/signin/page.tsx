"use client";

import { useContext } from "react";
import { signUp, signIn, signOut } from "../firebase-auth";
import { useFirestore } from "../firebase-firestore";
import Button from "../../components/Button";
import { UserContext } from "../../components/UserProvider";
import UpdateUserForm from "./UpdateUserForm";

export default function SignIn() {
  const { user } = useContext(UserContext);
  let userData = useFirestore();

  return user && userData ? (
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
        Sign in or create an account to save your daily progress and settings.
      </p>
      {/* todo: add form for username and password on sign-up */}
      <div className="flex flex-row gap-4">
        <Button
          onClick={() =>
            signIn("tasks_issuer.0w@icloud.com", "testherbivorous")
          }
          secondary={true}
        >
          Sign in
        </Button>
        <Button
          onClick={() =>
            signUp("tasks_issuer.0w@icloud.com", "testherbivorous")
          }
        >
          Sign up
        </Button>
      </div>
    </>
  );
}
