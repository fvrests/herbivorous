"use client";

import { useState, useEffect, useContext } from "react";
import { updateAuthEmail, updateAuthProfile } from "@/utils/firebase-auth";
import Button from "@/components/Button";
import { UserContext } from "@/components/UserProvider";

export default function UpdateUserForm() {
	const { user, setUser } = useContext(UserContext);

	const formDefaults = {
		email: "",
		displayName: "",
		photoURL: "",
	};

	const formFields = [
		{ name: "email", type: "email", label: "Email address" },
		{ name: "displayName", type: "name", label: "Display name" },
		{ name: "photoURL", type: "url", label: "Profile image (url)" },
	] as const;

	const [formData, setFormData] = useState(formDefaults);
	let [formUpdated, setFormUpdated] = useState(false);

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const isKeyUpdated = (key: keyof typeof formData): boolean => {
		return (
			(user && formData[key] !== user[key] && formData[key] !== "") ?? false
		);
	};
	const isFormUpdated = (): boolean => {
		let updatedKeys = (
			Object.keys(formData) as Array<keyof typeof formData>
		).filter(isKeyUpdated);
		return updatedKeys.length > 0;
	};
	useEffect(() => {
		setFormUpdated(isFormUpdated());
	}, [formData]);

	// todo: add remove display name button
	// todo: add remove profile image button

	const handleUpdateUser = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!user)
			return console.error("couldn't update user data (no user found)");

		const { email, ...profileForm } = formData;
		const profileUpdates = Object.fromEntries(
			Object.entries(profileForm).filter(([key, _]) => {
				return isKeyUpdated(key as keyof typeof formData);
			}),
		);

		if (isKeyUpdated("email")) {
			updateAuthEmail(email);
		}
		if (Object.keys(profileUpdates).length > 0) {
			setUser({ ...user, ...profileUpdates });
			updateAuthProfile(profileUpdates);
		}
		setFormData(formDefaults);
	};

	if (!user) return;
	return (
		<form className="max-w-full" onSubmit={(e) => handleUpdateUser(e)}>
			<div className="mb-2 flex max-w-full flex-col gap-2">
				{formFields.map((field) => {
					return (
						<div className="mb-4 w-full" key={field.name as keyof typeof user}>
							{/* todo: revise markup for other forms to remove heading in label */}
							<label
								htmlFor={field.name}
								className="mb-2 text-sm font-semibold tracking-tighter"
							>
								{field.label}
							</label>
							<input
								className="w-full rounded-lg border-2 border-border bg-b-low p-2 text-sm text-f-high placeholder:text-f-low hover:border-f-low focus:border-f-low"
								name={field.name}
								id={field.name}
								type={field.type}
								placeholder={user[field.name] || undefined}
								value={formData[field.name]}
								onChange={handleChangeInput}
							></input>
						</div>
					);
				})}
			</div>
			<Button type="submit" disabled={!formUpdated}>
				Save changes
			</Button>
		</form>
	);
}
