"use client";

import { getDateString } from "@/utils/date";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(`/day/${getDateString()}`);
}
