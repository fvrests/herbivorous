import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, getAuthErrorFromCode } from "@/utils/firebase-auth";
import Button from "@/components/Button";
import Link from "@/components/Link";
import { getLocalStorage, updateLocalOnlyData } from "@/utils/localStorage";

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
			{statusMessage && (
				<p className="mb-4 rounded-md bg-b-high px-4 py-2 text-sm">
					{statusMessage}
				</p>
			)}
			<form
				className="mb-16 flex max-w-full flex-col gap-2"
				onSubmit={(e) => {
					e.preventDefault();
					signInWithEmailAndPassword(auth, formData.email, formData.password)
						.then(() => {
							updateLocalOnlyData({ formEmail: "" });
							// signed in
							// router will push to "/user"
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
				<label className="mb-6 w-full">
					<h3 className="mb-2 text-sm font-semibold tracking-tighter">
						Password
					</h3>
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
				<Button type="submit">Sign in</Button>
			</form>
			<div className="mb-2 text-sm">
				New here? &nbsp;
				<Link href="/signup">Sign up</Link>
			</div>
			<div className="text-sm">
				Forgot password? &nbsp;
				<Link href="/forgot-password">Reset password</Link>
			</div>
		</>
	);
}
