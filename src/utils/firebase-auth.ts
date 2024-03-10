import { useState, useEffect } from "react";
import {
	getAuth,
	onAuthStateChanged,
	updateEmail,
	updateProfile,
} from "firebase/auth";
import { app } from "@/utils/firebase-config";

export const auth = getAuth(app);

export const useAuth = () => {
	// subscribe to auth changes
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
			setIsLoading(false);
		});
		// cleanup on unmount
		return () => {
			unsubscribe();
			setIsLoading(false);
		};
	}, []);

	// does not run automatically on auth data change, just on auth state (login / logout). when updating user should set user in context too
	return { user, setUser, isLoading };
};

export const updateAuthProfile = (profile: UserProfile) => {
	if (auth.currentUser) {
		updateProfile(auth.currentUser, {
			...profile,
		})
			.then(() => {
				// profile updated
			})
			.catch((error) => {
				console.error("error updating user profile", error);
			});
	} else {
		console.error("couldn't update user profile (no user found)");
	}
};

export const updateAuthEmail = (email: string) => {
	if (auth.currentUser) {
		updateEmail(auth.currentUser, email)
			.then(() => {
				// email updated
			})
			.catch((error) => {
				console.error("error updating user email", error);
			});
	} else {
		console.error("couldn't update user email (no user found)");
	}
};

export const AUTH_ERRORS: { [key: string]: string } = {
	default: "Something went wrong. Please try again.",
	"auth/code-expired": "The verification code has expired.",
	"auth/credential-already-in-use": "Something went wrong. Please try again.",
	"auth/requires-recent-login": "Credential too old, please log in again.",
	"auth/email-change-needs-verification": "Email change needs verification.",
	"auth/email-already-in-use": "Something went wrong. Please try again.",
	"auth/invalid-email": "Invalid login credentials.",
	"auth/invalid-credential": "Invalid login credentials.",
	"auth/wrong-password": "Invalid login credentials.",
	"auth/account-exists-with-different-credential": "Invalid login credentials.",
	"auth/rejected-credential": "Credential was rejected.",
	"auth/timeout": "Operation timed out.",
	"auth/too-many-requests": "Too many requests. Please try again later.",
	"auth/unverified-email": "Email is unverified.",
	"auth/user-not-found": "Invalid login credentials.",
	"auth/user-disabled": "Invalid login credentials.",
	"auth/user-mismatch": "Invalid login credentials.",
	"auth/user-signed-out": "User signed out.",
	"auth/weak-password": "Password is too weak.",
};

export function getAuthErrorFromCode(code: string): string {
	return AUTH_ERRORS[code] ? AUTH_ERRORS[code] : AUTH_ERRORS["default"];
}
