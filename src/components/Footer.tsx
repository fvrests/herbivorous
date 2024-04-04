"use client";

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/components/ThemeProvider";
import Link from "@/components/Link";
import { RadioGroup } from "@headlessui/react";

export default function Footer() {
	return (
		<>
			<nav>
				<ul className="flex w-full items-start justify-between text-sm">
					<div className="mx-4">
						<h2 className="mb-2 font-semibold tracking-tighter">Herbivorous</h2>
						<li>
							<Link href="/about">About</Link>
						</li>
					</div>
					<div className="mx-4 max-w-32">
						<li>
							<h2 className="mb-2 font-semibold tracking-tighter">Site</h2>
							<p>
								Built by <Link href="https://fvrests.dev">fvrests</Link> in 2024
								with <Link href="https://nextjs.org">NextJS</Link>
							</p>
						</li>
					</div>
				</ul>
			</nav>
		</>
	);
}
