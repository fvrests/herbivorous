"use client";

import { useContext } from "react";
import { signOut } from "@/utils/firebase-auth";
import { UserContext } from "../../components/UserProvider";
import Button from "../../components/Button";
import UpdateUserForm from "./UpdateUserForm";
import { useRouter } from "next/navigation";

export default function User() {
  const { user, isLoading } = useContext(UserContext);
  const router = useRouter();
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
      router.push("/signin")
    );
  }
}
