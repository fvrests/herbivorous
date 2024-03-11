"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/components/UserProvider";
import ResetPasswordForm from "./ResetPasswordForm";

export default function SignIn() {
	const { user, isLoading } = useContext(UserContext);
	const router = useRouter();

	useEffect(() => {
		if (user) {
			router.push("/user");
		}
	}, [user]);

	if (!isLoading && !user) {
		return (
			<>
				<h2 className="mb-4 text-lg font-semibold tracking-tighter">
					Reset password
				</h2>
				<p className="mb-8">
					Enter your email below. If your account exists, we&apos;ll send you a
					link to reset your password.
				</p>
				<ResetPasswordForm />
			</>
		);
	}
}
