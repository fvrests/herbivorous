"use client";

import Link from "@/components/Link";
import { getDateString } from "@/utils/date";

export default function Home() {
  return (
    <>
      <h2 className="font-bold text-3xl mt-20 mb-20">
        A daily dozen food planner
      </h2>
      <div className="mb-8">
        <Link href={`/day/${getDateString()}`}>Log now</Link>
      </div>
    </>
  );
}
