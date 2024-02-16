import { useEffect, useState } from "react";
import { signUp } from "@/utils/firebase-auth";
import Button from "@/components/Button";

export default function SignUpForm() {
  const formDefaults = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(formDefaults);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp(formData.email, formData.password);
  };

  // wait to access document until render - prevents breaking error
  useEffect(() => {
    const confirmPassword =
      (document.getElementById("confirmPassword") as HTMLInputElement) || null;

    confirmPassword?.addEventListener("input", (event) => {
      if (confirmPassword.validity.patternMismatch) {
        confirmPassword.setCustomValidity("Passwords must match");
      } else {
        confirmPassword.setCustomValidity("");
      }
    });
  }, []);

  return (
    <form
      className="flex flex-col max-w-full gap-2 mb-16"
      onSubmit={(e) => handleSignUp(e)}
    >
      <label className="w-full mb-4">
        <h3 className="font-bold text-sm mb-2">Email</h3>
        <input
          className="w-full bg-b-low text-f-high text-sm p-2 border-2 border-border rounded-lg hover:border-f-low focus:border-f-low placeholder:text-f-low"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChangeInput}
        ></input>
      </label>
      <label className="w-full mb-4">
        <h3 className="font-bold text-sm mb-1">Password</h3>
        <p className="text-xs mb-2 text-f-med">
          Must be at least 6 characters.
        </p>
        <input
          className="w-full bg-b-low text-f-high text-sm p-2 border-2 border-border rounded-lg hover:border-f-low focus:border-f-low placeholder:text-f-low"
          name="password"
          type="password"
          required
          minLength={6}
          value={formData.password}
          onChange={handleChangeInput}
        ></input>
      </label>
      <label className="w-full mb-4">
        <h3 className="font-bold text-sm mb-2">Confirm password</h3>
        <input
          className="w-full bg-b-low text-f-high text-sm p-2 border-2 border-border rounded-lg hover:border-f-low focus:border-f-low placeholder:text-f-low"
          name="confirmPassword"
          type="password"
          id="confirmPassword"
          required
          minLength={6}
          pattern={`^${formData.password}$`}
          value={formData.confirmPassword}
          onChange={handleChangeInput}
        ></input>
      </label>
      <Button type="submit">Sign up</Button>
    </form>
  );
}
