import { useEffect, useState } from "react";
import { signIn } from "../firebase-auth";
import Button from "@/components/Button";

// test data:
// tasks_issuer.0w@icloud.com
// testherbivorous

export default function signInForm() {
  const formDefaults = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(formDefaults);
  let [formComplete, setFormComplete] = useState(false);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isKeyUpdated = (key: any) => {
    return formData[key] !== "";
  };
  const isFormComplete = () => {
    let updatedKeys = Object.keys(formData).filter(isKeyUpdated);
    return updatedKeys.length == 2;
  };
  useEffect(() => {
    setFormComplete(isFormComplete());
    console.log({ formData });
  }, [formData]);

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formComplete) {
      signIn(formData.email, formData.password);
    }
  };

  return (
    <>
      <form
        className="flex flex-col max-w-full gap-2 mb-16"
        onSubmit={(e) => handleSignIn(e)}
      >
        {/* todo: add required field to required inputs in all forms*/}
        <label className="w-full mb-4">
          <h3 className="font-bold text-sm mb-2">Email</h3>
          <input
            className="w-full bg-b-low text-f-high text-sm p-2 border-2 border-b-high rounded-lg hover:border-f-low focus:border-f-low"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChangeInput}
          ></input>
        </label>
        <label className="w-full mb-4">
          <h3 className="font-bold text-sm mb-2">Password</h3>
          <input
            className="w-full bg-b-low text-f-high text-sm p-2 border-2 border-b-high rounded-lg hover:border-f-low focus:border-f-low"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChangeInput}
          ></input>
        </label>
        <Button type="submit" disabled={!formComplete}>
          Sign in
        </Button>
      </form>
    </>
  );
}
