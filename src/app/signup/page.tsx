"use client";

import { useContext } from "react";
import SignUpForm from "./SignUpForm";
import Link from "@/components/Link";
import { UserContext } from "@/components/UserProvider";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const { user, isLoading } = useContext(UserContext);
  const router = useRouter();
  if (!isLoading) {
    return !user ? (
      <>
        <h2 className="font-bold text-lg mb-4">Sign up</h2>
        <p className="mb-8">Create an account with your email and password.</p>
        <SignUpForm />
        <div className="text-sm">
          Already have an account? &nbsp;
          <Link href="/user">Sign in</Link>
        </div>
      </>
    ) : (
      router.push("/user")
    );
  }
}
