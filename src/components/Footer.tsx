"use client";

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/components/ThemeProvider";
import Link from "@/components/Link";
import { RadioGroup } from "@headlessui/react";

export default function Footer() {
	const themeNames: Theme[] = ["earthy", "cosmic"];
	const { theme, updateTheme, isLoading } = useContext(ThemeContext);
	const [selectedTheme, setSelectedTheme] = useState(theme ?? "earthy");

	useEffect(() => {
		if (theme) setSelectedTheme(theme);
	}, [isLoading]);

	useEffect(() => {
		updateTheme(selectedTheme);
	}, [selectedTheme]);

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
					<div className="mx-4">
						<RadioGroup
							value={selectedTheme}
							onChange={setSelectedTheme}
							className="flex flex-col gap-2"
						>
							<RadioGroup.Label className="font-semibold tracking-tighter">
								Theme
							</RadioGroup.Label>
							{themeNames.map((themeName: Theme) => (
								<RadioGroup.Option
									key={themeName}
									value={themeName}
									className="rounded-sm"
								>
									{({ checked }) => (
										<div className="relative cursor-pointer">
											{checked && <span className="absolute -left-4">•</span>}
											<li
												className={`${
													checked
														? "text-f-high underline decoration-wavy"
														: "text-f-low"
												} first-letter:uppercase`}
											>
												{themeName}
											</li>
										</div>
									)}
								</RadioGroup.Option>
							))}
						</RadioGroup>
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
