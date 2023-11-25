export {};

declare global {
  interface Suggestion {
    name: string;
    portion: {
      metric: { quantity: number; unit: string };
      imperial: { quantity: number; unit: string };
    };
  }
}

declare global {
  interface NeedsItem {
    name: string;
    goal: number;
    info: string[];
    suggestions: Suggestion[];
  }
}
