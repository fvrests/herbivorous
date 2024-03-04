"use client";

import { redirect } from "next/navigation";
import { getDateString } from "@/utils/date";

export default function Home() {
  redirect(`/day/${getDateString()}`);
}
