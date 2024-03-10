export {};

declare global {
	interface Suggestion {
		name: string;
		portion: {
			metric: { quantity: number | string; unit: string };
			imperial: { quantity: number | string; unit: string };
		};
	}

	interface Goal {
		name: string;
		quantity: number;
		info: string[];
		icon: string;
		suggestions: Suggestion[];
		types: string[];
	}

	type Mode = "dark" | "light" | "system";
	type Theme = "earthy" | "cosmic";

	interface UserData {
		settings?: {
			units?: "metric" | "imperial";
		};
		progress?: {
			[key: string]: {
				[key: string]: number;
			};
		};
	}

	interface UserProfile {
		displayName?: string | null;
		photoURL?: string | null;
	}

	interface User extends UserProfile {
		uid: string;
		email: string | null;
	}
}
