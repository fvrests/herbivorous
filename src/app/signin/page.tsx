"use client";

import { useState, useEffect, useContext } from "react";
import {
  signUp,
  signIn,
  signOut,
  updateAuthEmail,
  updateAuthProfile,
} from "../firebase-auth";
import { useFirestore } from "../firebase-firestore";
import Button from "../../components/Button";
import { UserContext } from "../../components/UserProvider";

export default function SignIn() {
  const { user, setUser } = useContext(UserContext);
  let userData = useFirestore();

  const formDefaults = {
    email: "",
    displayName: "",
    photoURL: "",
  };

  const [formData, setFormData] = useState(formDefaults);

  let [formUpdated, setFormUpdated] = useState(false);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isKeyUpdated = (key: any) => {
    return user && formData[key] !== user[key] && formData[key] !== "";
  };

  const isFormUpdated = () => {
    let updatedKeys = Object.keys(formData).filter(isKeyUpdated);
    return updatedKeys.length > 0;
  };

  useEffect(() => {
    setFormUpdated(isFormUpdated());
  }, [formData]);

  const handleUpdateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user)
      return console.error("couldn't update user data (no user found)");
    const { email, ...profileForm } = formData;
    if (isKeyUpdated("email")) {
      updateAuthEmail(email);
    }
    const profileUpdates = Object.fromEntries(
      Object.entries(profileForm).filter(([key, _]) => {
        return isKeyUpdated(key);
      }),
    );
    if (Object.keys(profileUpdates).length > 0) {
      setUser({ ...user, ...profileUpdates });
      updateAuthProfile(profileUpdates);
      setFormData(formDefaults);
    }
  };

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
      <form
        className="flex flex-col max-w-full gap-2 mb-16"
        onSubmit={(e) => handleUpdateUser(e)}
      >
        <label className="w-full mb-4">
          <h3 className="font-bold text-sm mb-2">Email address</h3>
          <input
            className="w-full bg-b-low text-f-high text-sm p-2 border-2 border-b-high rounded-lg hover:border-f-low focus:border-f-low"
            name="email"
            type="email"
            placeholder={user.email}
            value={formData.email}
            onChange={handleChangeInput}
          ></input>
        </label>
        <label className="w-full mb-4">
          <h3 className="font-bold text-sm mb-2">Display name</h3>
          <input
            className="w-full bg-b-low text-f-high text-sm p-2 border-2 border-b-high rounded-lg hover:border-f-low focus:border-f-low"
            name="displayName"
            type="text"
            placeholder={user.displayName}
            value={formData.displayName}
            onChange={handleChangeInput}
          ></input>
        </label>
        <label className="w-full mb-4">
          <h3 className="font-bold text-sm mb-2">Profile image (url)</h3>
          <input
            className="w-full bg-b-low text-f-high text-sm p-2 border-2 border-b-high rounded-lg hover:border-f-low focus:border-f-low truncate"
            name="photoURL"
            type="url"
            placeholder={user.photoURL}
            value={formData.photoURL}
            onChange={handleChangeInput}
          ></input>
        </label>
        <Button type="submit" disabled={!formUpdated}>
          Save changes
        </Button>
      </form>
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
