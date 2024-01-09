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
    icons: string[];
    suggestions: Suggestion[];
    types: string[];
  }

  type Theme = "dark" | "light" | "system";
  type ThemeVariant = "modern" | "natural";

  interface UserData {
    settings?: {
      units?: "metric" | "imperial";
      theme?: Theme;
      themeVariant?: ThemeVariant;
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
