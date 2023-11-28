"use client";

import { useState } from "react";
import {
  useFirebaseAuth,
  signUp,
  signIn,
  signOut,
  updateUser,
} from "../firebase";
import Button from "../../components/Button";

export default function SignIn() {
  let user = useFirebaseAuth();

  const [formData, setFormData] = useState<{
    displayName: string;
    photoURL: string;
  }>({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser(formData.displayName, formData.photoURL);
  };

  return (
    <>
      {/* todo: add form for username and password on sign-up*/}
      {!user && (
        <>
          <h2 className="font-bold text-lg mb-4">You're not signed in.</h2>
          <p className="mb-8">
            Sign in or create an account to save your daily progress and
            settings.
          </p>
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
      )}
      {user && (
        <>
          <div className="flex flex-col items-center mb-16">
            {user?.photoURL && (
              <img
                src={user.photoURL}
                alt={`profile image for ${user.displayName}`}
                className="rounded-full w-20 h-20 mb-4 object-cover shadow-inner"
              />
            )}
            <h2 className="font-bold text-lg">{user?.displayName}</h2>
          </div>

          <form
            className="flex flex-col max-w-full gap-2 mb-16"
            onSubmit={(event) => handleSubmit(event)}
          >
            <label className="w-full mb-4">
              <h3 className="font-bold text-sm mb-2">Display name</h3>
              <input
                className="w-full bg-b-low text-f-high text-sm p-2 border-2 border-b-high rounded-lg hover:border-f-low focus:border-f-low"
                type="text"
                placeholder={user?.displayName || ""}
                value={formData.displayName}
                onChange={(e) =>
                  setFormData({ ...formData, displayName: e.target.value })
                }
              ></input>
            </label>
            <label className="w-full mb-4">
              <h3 className="font-bold text-sm mb-2">Profile image (url)</h3>
              <input
                className="w-full bg-b-low text-f-high text-sm p-2 border-2 border-b-high rounded-lg hover:border-f-low focus:border-f-low truncate"
                type="text"
                placeholder={user?.photoURL || ""}
                value={formData.photoURL}
                onChange={(e) =>
                  setFormData({ ...formData, photoURL: e.target.value })
                }
              ></input>
            </label>
            <Button
              type="submit"
              disabled={
                user.displayName === formData.displayName &&
                user.photoURL === formData.photoURL
              }
            >
              Save changes
            </Button>
          </form>
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      )}
    </>
  );
}
