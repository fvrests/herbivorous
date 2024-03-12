"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/components/UserProvider";
import SignInForm from "./SignInForm";
import text from "@/app/styles/text.module.css";

export default function SignIn() {
	const { user, isLoading } = useContext(UserContext);
	const router = useRouter();

	useEffect(() => {
		if (user) {
			router.push("/");
		}
	}, [user]);

	if (!isLoading && !user) {
		return (
			<>
				<h2 className={text.heading}>You&apos;re not signed in.</h2>
				<p className={text.subheading}>
					Sign in to save your daily progress and settings.
				</p>
				<SignInForm />
			</>
		);
	}
}
