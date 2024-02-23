"use client";

import { getDateString } from "@/utils/date";
import Link from "@/components/Link";

export default function About() {
  return (
    <>
      <h2 className="font-semibold tracking-tighter text-3xl mt-20 mb-20">
        A daily dozen food planner
      </h2>
      <div className="mb-8">
        Herbivorous is a daily food journal based on the{" "}
        <Link href="https://nutritionfacts.org/daily-dozen/">Daily Dozen</Link>,
        a science-based set of nutritious food recommendations for a plant-based
        diet. We aim to make planning a healthy vegan diet a little easier and
        give you the tools you need to treat yourself and other beings on this
        planet with the utmost love and care. ♥
      </div>
      <div className="mb-8">
        Please consult a medical professional about the right diet for you. You
        can browse more information on plant-based nutrition at{" "}
        <Link href="https://nutritionfacts.org">NutritionFacts.org</Link>, or
        check out{" "}
        <Link href="https://literal.club/book/how-not-to-die-60zr1">
          How Not to Die
        </Link>{" "}
        for further reading on the benefits of whole plant foods and the
        scientific body of research supporting these guidelines.
      </div>
      <div className="mb-8">
        <Link href={`/day/${getDateString()}`}>Log now</Link>
      </div>
    </>
  );
}
