import { useState } from "react";

export interface Options {
  units: "metric" | "imperial";
}

export default function useOptions() {
  // todo: pass out function to set options without overwriting
  const [options, setOptions] = useState<Options>({
    units: "metric",
  });

  return [options, setOptions] as const;
}
