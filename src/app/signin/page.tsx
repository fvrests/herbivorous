"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/components/UserProvider";
import Link from "@/components/Link";
import SignInForm from "./SignInForm";

export default function SignIn() {
  const { user, isLoading } = useContext(UserContext);
  const router = useRouter();
  if (!isLoading) {
    return !user ? (
      <>
        <h2 className="font-semibold tracking-tighter text-lg mb-4">
          You&apos;re not signed in.
        </h2>
        <p className="mb-8">
          Sign in to save your daily progress and settings.
        </p>
        <SignInForm />
        <div className="text-sm">
          New here? &nbsp;
          <Link href="/signup">Sign up</Link>
        </div>
      </>
    ) : (
      router.push("/user")
    );
  }
}
