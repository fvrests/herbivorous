"use client";

import { useContext, useEffect } from "react";
import { UserContext } from "@/components/UserProvider";
import SignUpForm from "./SignUpForm";
import { useRouter } from "next/navigation";

// fix: redirect to home page on signup / signin
export default function SignUp() {
  const router = useRouter();
  const { user, isLoading } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      router.push("/user");
    }
  }, [user]);

  if (!isLoading && !user) {
    return (
      <>
        <h2 className="font-semibold tracking-tighter text-lg mb-4">Sign up</h2>
        <p className="mb-8">Create an account with your email and password.</p>
        <SignUpForm />
      </>
    );
  }
}
