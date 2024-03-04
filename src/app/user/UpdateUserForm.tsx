"use client";

import { useState, useEffect, useContext } from "react";
import { updateAuthEmail, updateAuthProfile } from "@/utils/firebase-auth";
import Button from "@/components/Button";
import { UserContext } from "@/components/UserProvider";

export default function UpdateUserForm() {
  const { user, setUser } = useContext(UserContext);

  const formDefaults = {
    email: "",
    displayName: "",
    photoURL: "",
  };

  const formFields = [
    { name: "email", type: "email", label: "Email address" },
    { name: "displayName", type: "name", label: "Display name" },
    { name: "photoURL", type: "url", label: "Profile image (url)" },
  ] as const;

  const [formData, setFormData] = useState(formDefaults);
  let [formUpdated, setFormUpdated] = useState(false);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isKeyUpdated = (key: keyof typeof formData): boolean => {
    return (
      (user && formData[key] !== user[key] && formData[key] !== "") ?? false
    );
  };
  const isFormUpdated = (): boolean => {
    let updatedKeys = (
      Object.keys(formData) as Array<keyof typeof formData>
    ).filter(isKeyUpdated);
    return updatedKeys.length > 0;
  };
  useEffect(() => {
    setFormUpdated(isFormUpdated());
  }, [formData]);

  // todo: add remove display name button
  // todo: add remove profile image button

  const handleUpdateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user)
      return console.error("couldn't update user data (no user found)");

    const { email, ...profileForm } = formData;
    const profileUpdates = Object.fromEntries(
      Object.entries(profileForm).filter(([key, _]) => {
        return isKeyUpdated(key as keyof typeof formData);
      }),
    );

    if (isKeyUpdated("email")) {
      updateAuthEmail(email);
    }
    if (Object.keys(profileUpdates).length > 0) {
      setUser({ ...user, ...profileUpdates });
      updateAuthProfile(profileUpdates);
    }
    setFormData(formDefaults);
  };

  return (
    user && (
      <>
        <form className="max-w-full" onSubmit={(e) => handleUpdateUser(e)}>
          <div className="flex flex-col max-w-full gap-2 mb-2">
            {formFields.map((field) => {
              return (
                <label
                  className="w-full mb-4"
                  key={field.name as keyof typeof user}
                >
                  <h3 className="font-semibold tracking-tighter text-sm mb-2">
                    {field.label}
                  </h3>
                  <input
                    className="w-full bg-b-low text-f-high text-sm p-2 border-2 border-border rounded-lg hover:border-f-low focus:border-f-low placeholder:text-f-low"
                    name={field.name}
                    type={field.type}
                    placeholder={user[field.name] || undefined}
                    value={formData[field.name]}
                    onChange={handleChangeInput}
                  ></input>
                </label>
              );
            })}
          </div>
          <Button type="submit" disabled={!formUpdated}>
            Save changes
          </Button>
        </form>
      </>
    )
  );
}
