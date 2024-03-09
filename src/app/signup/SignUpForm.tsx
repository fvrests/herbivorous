"use client";

import { useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Button from "@/components/Button";
import Link from "@/components/Link";
import { auth, getAuthErrorFromCode } from "@/utils/firebase-auth";
import { updateAuthProfile } from "@/utils/firebase-auth";
import profileDefaults from "@/app/profile-defaults.json";
import { UserContext } from "@/components/UserProvider";

export default function SignUpForm() {
	const { user, setUser } = useContext(UserContext);
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

	// wait to access document until render - prevents breaking error
	useEffect(() => {
		const confirmPassword =
			(document.getElementById("confirmPassword") as HTMLInputElement) || null;

		confirmPassword?.addEventListener("input", () => {
			if (confirmPassword.validity.patternMismatch) {
				confirmPassword.setCustomValidity("Passwords must match");
			} else {
				confirmPassword.setCustomValidity("");
			}
		});
	}, []);

	const [statusMessage, setStatusMessage] = useState<string | null>(null);

	return (
		<>
			{statusMessage && (
				<p className="mb-4 rounded-md bg-b-high px-4 py-2 text-sm">
					{statusMessage}
				</p>
			)}
			<form
				className="mb-16 flex max-w-full flex-col gap-2"
				onSubmit={(e) => {
					e.preventDefault();
					createUserWithEmailAndPassword(
						auth,
						formData.email,
						formData.password,
					)
						.then((userCredential) => {
							// signed in -- router will push to "/user"
							// set a random image / name from profile defaults
							const profileDefaultIndex = Math.floor(Math.random() * (14 + 1));
							updateAuthProfile(profileDefaults[profileDefaultIndex]);
							setUser({
								uid: userCredential.user.uid,
								email: userCredential.user.email,
								...profileDefaults[profileDefaultIndex],
							});
						})
						.catch((error) => {
							setStatusMessage(`Error: ${getAuthErrorFromCode(error.code)}`);
						});
				}}
			>
				<label className="mb-4 w-full">
					<h3 className="mb-2 text-sm font-semibold tracking-tighter">Email</h3>
					<input
						className="w-full rounded-lg border-2 border-border bg-b-low p-2 text-sm text-f-high placeholder:text-f-low hover:border-f-low focus:border-f-low"
						name="email"
						type="email"
						required
						value={formData.email}
						onChange={handleChangeInput}
					></input>
				</label>
				<label className="mb-4 w-full">
					<h3 className="mb-1 text-sm font-semibold tracking-tighter">
						Password
					</h3>
					<p className="mb-2 text-xs text-f-med">
						Must be at least 6 characters.
					</p>
					<input
						className="w-full rounded-lg border-2 border-border bg-b-low p-2 text-sm text-f-high placeholder:text-f-low hover:border-f-low focus:border-f-low"
						name="password"
						type="password"
						required
						minLength={6}
						value={formData.password}
						onChange={handleChangeInput}
					></input>
				</label>
				<label className="mb-6 w-full">
					<h3 className="mb-2 text-sm font-semibold tracking-tighter">
						Confirm password
					</h3>
					<input
						className="w-full rounded-lg border-2 border-border bg-b-low p-2 text-sm text-f-high placeholder:text-f-low hover:border-f-low focus:border-f-low"
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
			<div className="mb-2 text-sm">
				Already have an account? &nbsp;
				<Link href="/user">Sign in</Link>
			</div>
			<div className="text-sm">
				Forgot password? &nbsp;
				<Link href="/forgot-password">Reset password</Link>
			</div>
		</>
	);
}
