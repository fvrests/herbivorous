"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { auth, getAuthErrorFromCode } from "@/utils/firebase-auth";
import { UserContext } from "@/components/UserProvider";
import Button from "@/components/Button";
import UpdateUserForm from "./UpdateUserForm";

const imageLoader = ({ src }: { src: string }) => {
  return src;
};

export default function User() {
  const { user, isLoading } = useContext(UserContext);
  const router = useRouter();

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user]);

  if (!isLoading && user) {
    return (
      <>
        <div className="flex flex-col items-center mb-16">
          {user.photoURL && (
            <Image
              loader={imageLoader}
              src={user.photoURL}
              width="20"
              height="20"
              alt={`profile image for ${user.displayName}`}
              className="rounded-full w-20 h-20 mb-4 object-cover shadow-inner"
            />
          )}
          <h2 className="font-semibold tracking-tighter text-lg">
            {user.displayName ? user.displayName : user.email}
          </h2>
        </div>
        <h3 className="font-semibold tracking-tighter text-lg mb-8">
          Update profile
        </h3>
        <div className="mb-8">
          <UpdateUserForm />
        </div>
        <h3 className="font-semibold tracking-tighter text-lg mb-4">
          Sign out
        </h3>
        {statusMessage && (
          <p className="py-2 mb-4 bg-b-high px-4 rounded-md text-sm">
            {statusMessage}
          </p>
        )}
        <Button
          onClick={() => {
            signOut(auth)
              .then(() => {
                console.log("signed out");
                // Signed out -- will push to "/signin"
              })
              .catch((error) => {
                setStatusMessage(getAuthErrorFromCode(error.code));
              });
          }}
        >
          Sign out
        </Button>
      </>
    );
  }
}
