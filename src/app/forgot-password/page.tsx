"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/components/UserProvider";
import ResetPasswordForm from "./ResetPasswordForm";
import text from "@/app/styles/text.module.css";

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
				<h2 className={text.heading}>Reset password</h2>
				<p className={text.subheading}>
					Enter your email below. If your account exists, we&apos;ll send you a
					link to reset your password.
				</p>
				<ResetPasswordForm />
			</>
		);
	}
}
