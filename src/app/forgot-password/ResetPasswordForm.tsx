import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, getAuthErrorFromCode } from "@/utils/firebase-auth";
import Button from "@/components/Button";
import Link from "@/components/Link";
import { getLocalStorage, updateLocalOnlyData } from "@/utils/localStorage";
import form from "@/app/styles/form.module.css";
import message from "@/app/styles/message.module.css";

export default function ResetPasswordForm() {
	const formDefaults = {
		email: "",
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
					sendPasswordResetEmail(auth, formData.email)
						.then(() => {
							setStatusMessage(
								"Request submitted. Check your inbox & spam folders for password reset instructions.",
							);
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
				<Button type="submit">Send email</Button>
			</form>
			<p className="mb-2 text-sm">
				Know your login details? &nbsp;
				<Link href="/signin">Sign in</Link>
			</p>
			<p className="mb-2 text-sm">
				New here? &nbsp;
				<Link href="/signup">Sign up</Link>
			</p>
		</>
	);
}
