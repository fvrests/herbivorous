export {};

declare global {
  interface Suggestion {
    name: string;
    portion: {
      metric: { quantity: number | string; unit: string };
      imperial: { quantity: number | string; unit: string };
    };
  }

  interface Need {
    name: string;
    goal: number;
    info: string[];
    suggestions: Suggestion[];
    types: string[];
  }

  interface UserData {
    settings?: {
      units?: "metric" | "imperial";
    };
    goalProgress?: {
      [key: Date]: {
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
