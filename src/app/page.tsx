"use client";

import needs from "./needs.json";
import NeedsItem from "../components/NeedsItem";

export default function Home() {
  return (
    <>
      {needs.map((need) => (
        <div className="mb-6" key={need.name}>
          <NeedsItem need={need} />
        </div>
      ))}
    </>
  );
}
