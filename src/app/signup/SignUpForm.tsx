"use client";

import { useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Button from "@/components/Button";
import Link from "@/components/Link";
import { auth, getAuthErrorFromCode } from "@/utils/firebase-auth";
import { updateAuthProfile } from "@/utils/firebase-auth";
import profileDefaults from "@/app/profile-defaults.json";
import { UserContext } from "@/components/UserProvider";
import { getLocalStorage, updateLocalOnlyData } from "@/utils/localStorage";
import form from "@/app/styles/form.module.css";
import message from "@/app/styles/message.module.css";

export default function SignUpForm() {
	const { setUser } = useContext(UserContext);
	const formDefaults = {
		email: "",
		password: "",
		confirmPassword: "",
	};
	const localData = getLocalStorage("localOnly");
	const [formData, setFormData] = useState({
		...formDefaults,
		email: localData.formEmail,
	});

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
		if (e.target.name === "email")
			updateLocalOnlyData({ formEmail: e.target.value });
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
			<form
				className={form.root}
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
							updateLocalOnlyData({ formEmail: "" });
						})
						.catch((error) => {
							setStatusMessage(`Error: ${getAuthErrorFromCode(error.code)}`);
						});
				}}
			>
				{statusMessage && <p className={message.base}>{statusMessage}</p>}
				<div>
					<label htmlFor="email" className={form.label}>
						Email
					</label>
					<input
						className={form.input}
						id="email"
						name="email"
						type="email"
						required
						value={formData.email}
						onChange={handleChangeInput}
					></input>
				</div>
				<div>
					<label htmlFor="password" className={form.label}>
						Password
					</label>
					<p className={form.sublabel}>Must be at least 6 characters.</p>
					<input
						className={form.input}
						id="password"
						name="password"
						type="password"
						required
						minLength={6}
						value={formData.password}
						onChange={handleChangeInput}
					></input>
				</div>
				<div>
					<label htmlFor="confirmPassword" className={form.label}>
						Confirm password
					</label>
					<p className={form.sublabel}>
						Forgot? &nbsp;
						<Link href="/forgot-password">Reset password</Link>
					</p>
					<input
						className={form.input}
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						required
						minLength={6}
						pattern={`^${formData.password}$`}
						value={formData.confirmPassword}
						onChange={handleChangeInput}
					></input>
				</div>
				<Button type="submit">Sign up</Button>
			</form>
			<span className="text-sm">
				Already have an account? &nbsp;
				<Link href="/user">Sign in</Link>
			</span>
		</>
	);
}
