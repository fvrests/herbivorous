import { useState } from "react";
import { signIn } from "../firebase-auth";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function signInForm() {
  const router = useRouter();

  const formDefaults = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(formDefaults);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn(formData.email, formData.password);
    router.push("/");
  };

  return (
    <>
      <form
        className="flex flex-col max-w-full gap-2 mb-16"
        onSubmit={(e) => handleSignIn(e)}
      >
        <label className="w-full mb-4">
          <h3 className="font-bold text-sm mb-2">Email</h3>
          <input
            className="w-full bg-b-low text-f-high text-sm p-2 border-2 border-b-high rounded-lg hover:border-f-low focus:border-f-low"
            name="email"
            type="email"
            required
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
            required
            minLength={6}
            value={formData.password}
            onChange={handleChangeInput}
          ></input>
        </label>
        <Button type="submit">Sign in</Button>
      </form>
    </>
  );
}
