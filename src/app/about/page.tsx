"use client";

import { getDateString } from "@/utils/date";
import Link from "@/components/Link";

export default function About() {
  return (
    <>
      <h2 className="font-bold text-3xl mt-20 mb-20">
        A daily dozen food planner
      </h2>
      <div className="mb-8">
        Herbivorous is a daily food journal based on the work of{" "}
        <Link href="https://drgreger.org/pages/about-us">
          Dr. Michael Greger, M.D. FACLM
        </Link>
        . We aim to make following a healthy, well-planned plant-based diet a
        little easier and give you the tools you need to treat yourself and
        other beings on this planet with the utmost love and care. ♥
      </div>
      <div className="mb-8">
        Please consult a medical professional about the right diet for you. You
        can browse Dr. Greger's work on nutrition at{" "}
        <Link href="https://nutritionfacts.org">nutritionfacts.org</Link>.
      </div>
      <div className="mb-8">
        <Link href={`/day/${getDateString()}`}>Log now</Link>
      </div>
    </>
  );
}
