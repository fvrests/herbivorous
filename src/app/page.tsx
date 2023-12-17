"use client";

import goals from "./goals.json";
import Goal from "../components/Goal";

export default function Home() {
  return (
    <>
      {goals.map((goal) => (
        <div className="mb-6" key={goal.name}>
          <Goal goal={goal} />
        </div>
      ))}
    </>
  );
}
