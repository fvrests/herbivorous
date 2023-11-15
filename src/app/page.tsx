"use client";

import { useState } from "react";
import needs from "./needs.json";
import NeedsItem from "../components/NeedsItem";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-12 max-w-2xl mx-auto">
      <h1 className="font-bold text-xl mb-8">Herbivorous</h1>
      {needs.map((need) => (
        <div className="mb-8" key={need.name}>
          <NeedsItem need={need} />
        </div>
      ))}
    </main>
  );
}
