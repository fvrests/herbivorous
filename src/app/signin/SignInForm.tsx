import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, getAuthErrorFromCode } from "@/utils/firebase-auth";
import Button from "@/components/Button";
import Link from "@/components/Link";
import { getLocalStorage, updateLocalOnlyData } from "@/utils/localStorage";
import form from "@/app/styles/form.module.css";
import message from "@/app/styles/message.module.css";

export default function SignInForm() {
	const formDefaults = {
		email: "",
		password: "",
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

	const [statusMessage, setStatusMessage] = useState<string | null>(null);

	return (
		<>
			<form
				className={form.root}
				onSubmit={(e) => {
					e.preventDefault();
					signInWithEmailAndPassword(auth, formData.email, formData.password)
						.then(() => {
							updateLocalOnlyData({ formEmail: "" });
							// signed in
							// router will push to "/"
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
					<p className={form.sublabel}>
						Forgot? &nbsp;
						<Link href="/forgot-password">Reset password</Link>
					</p>
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
				<Button type="submit">Sign in</Button>
			</form>
			<div className="mb-2 text-sm">
				New here? &nbsp;
				<Link href="/signup">Sign up</Link>
			</div>
		</>
	);
}
