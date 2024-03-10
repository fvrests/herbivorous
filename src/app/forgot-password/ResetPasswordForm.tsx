import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, getAuthErrorFromCode } from "@/utils/firebase-auth";
import Button from "@/components/Button";
import Link from "@/components/Link";

// todo: add forgot password flow
// todo: persist email between sign up / sign in / forgot password
export default function ResetPasswordForm() {
	const formDefaults = {
		email: "",
	};
	const [formData, setFormData] = useState(formDefaults);

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const [statusMessage, setStatusMessage] = useState<string | null>(null);

	return (
		<>
			{/* todo: transition? */}
			{statusMessage && (
				<p className="mb-4 rounded-md bg-b-high px-4 py-2 text-sm">
					{statusMessage}
				</p>
			)}
			<form
				className="mb-16 flex max-w-full flex-col gap-2"
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
				<Button type="submit">Send email</Button>
			</form>
			<div className="mb-2 text-sm">
				Know your login details? &nbsp;
				<Link href="/signin">Sign in</Link>
			</div>
			<div className="mb-2 text-sm">
				New here? &nbsp;
				<Link href="/signup">Sign up</Link>
			</div>
		</>
	);
}
