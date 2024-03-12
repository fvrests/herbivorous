"use client";

import { useState, useEffect, useContext } from "react";
import {
	updateAuthProfile,
	updateAuthEmail,
	auth,
	getAuthErrorFromCode,
} from "@/utils/firebase-auth";
import Button from "@/components/Button";
import { UserContext } from "@/components/UserProvider";
import { getLocalStorage, updateLocalOnlyData } from "@/utils/localStorage";
import message from "@/app/styles/message.module.css";

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

	const localData = getLocalStorage("localOnly");
	const [formData, setFormData] = useState({
		...formDefaults,
		email: localData.formEmail,
	});

	let [formUpdated, setFormUpdated] = useState(false);

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
		if (e.target.name === "email")
			updateLocalOnlyData({ formEmail: e.target.value });
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

	const [statusMessage, setStatusMessage] = useState<string | null>(null);

	// todo: add remove display name button
	// todo: add remove profile image button
	const handleUpdateUser = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!user || !auth.currentUser)
			return setStatusMessage("couldn't update user data (no user found)");

		// separate email (has own setter function) from auth profile data
		const { email, ...profileForm } = formData;

		if (isKeyUpdated("email")) {
			updateAuthEmail(email);
		}

		const profileUpdates: UserProfile = {};
		if (isKeyUpdated("displayName")) {
			profileUpdates.displayName = profileForm.displayName;
		}
		if (isKeyUpdated("photoURL")) {
			profileUpdates.photoURL = profileForm.photoURL;
		}
		if (Object.keys(profileUpdates).length > 0) {
			// set local user data to update page immediately
			setUser({ ...user, ...profileUpdates });
			// update profile & handle error message
			setStatusMessage(updateAuthProfile(profileUpdates) ?? null);
		}

		// reset email in localStorage
		updateLocalOnlyData({ formEmail: "" });
		// clear form
		setFormData(formDefaults);
	};

	if (!user) return;
	return (
		<>
			<form className="max-w-full" onSubmit={(e) => handleUpdateUser(e)}>
				{statusMessage && <p className={message.base}>{statusMessage}</p>}
				<div className="mb-2 flex max-w-full flex-col gap-2">
					{formFields.map((field) => {
						return (
							<div
								className="mb-4 w-full"
								key={field.name as keyof typeof user}
							>
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
		</>
	);
}
