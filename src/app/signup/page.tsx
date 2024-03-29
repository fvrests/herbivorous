"use client";

import { useContext, useEffect } from "react";
import { UserContext } from "@/components/UserProvider";
import SignUpForm from "./SignUpForm";
import { useRouter } from "next/navigation";
import text from "@/app/styles/text.module.css";

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
				<h2 className={text.heading}>Sign up</h2>
				<p className={text.subheading}>
					Create an account with your email and password.
				</p>
				<SignUpForm />
			</>
		);
	}
}
