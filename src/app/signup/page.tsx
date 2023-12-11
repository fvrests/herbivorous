"use client";

import SignUpForm from "./SignUpForm";
import Link from "@/components/Link";

export default function SignIn() {
  return (
    <>
      <h2 className="font-bold text-lg mb-4">Sign up</h2>
      <p className="mb-8">Create an account with your email and password.</p>
      <SignUpForm />
      <div className="text-sm">
        Already have an account? &nbsp;
        <Link href="/signin">Sign in</Link>
      </div>
    </>
  );
}
