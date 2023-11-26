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
}
