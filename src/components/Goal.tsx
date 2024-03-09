"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import { Plus } from "react-feather";
import { useProgress } from "@/utils/firebase-firestore";
import { UserContext } from "@/components/UserProvider";
import { ThemeContext } from "@/components/ThemeProvider";
import GoalDetails from "@/components/GoalDetails";
import ProgressBar from "@/components/ProgressBar";

interface Props {
	goal: Goal;
	date: string;
}

export default function Goal({ goal, date }: Props) {
	const { user } = useContext(UserContext);
	const { mode, theme } = useContext(ThemeContext);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);

	const { progress, increment, reset, overflow } = useProgress(
		user,
		goal,
		date,
	);

	const toggleDetails = () => {
		setIsDetailsOpen(!isDetailsOpen);
	};

	// todo: maybe set programmatically from goals list
	// maximum servings: beverages
	const maxQuantity = 5;

	return (
		<div className="flex items-center gap-4 py-2">
			<button
				className="-mx-2 flex flex-1 items-center gap-4 overflow-visible rounded-md px-2 py-4 hover:bg-b-low hover:text-f-high"
				aria-label="open item details"
				onClick={() => toggleDetails()}
			>
				<div
					className={`${mode === "light" ? "brightness-75" : "brightness-125"}`}
				>
					<Image
						alt=""
						width={36}
						height={36}
						src={`/goals/${goal.icon ?? "beans"}${
							theme === "earthy" ? "-earthy" : "-cosmic"
						}.png`}
					></Image>
				</div>
				<div className="flex w-full flex-col gap-x-8 gap-y-2 overflow-visible sm:flex-row sm:items-center">
					<div className="grid flex-1 grid-flow-col items-center justify-start gap-4">
						<p className="max-w-full truncate text-left first-letter:capitalize sm:overflow-visible sm:whitespace-nowrap">
							{goal.name}
						</p>
						<div className="whitespace-nowrap rounded-full border-2 border-border bg-capsule px-2 py-0.5 text-xs font-medium ">
							{progress + " / " + goal.quantity}
						</div>
					</div>
					<div className="flex h-6 flex-1 sm:justify-end">
						{" "}
						<div
							className="h-full"
							style={{ width: (goal.quantity / maxQuantity) * 100 + "%" }}
						>
							<ProgressBar progress={progress} goal={goal} overflow={overflow}>
								<span
									className="z-10 flex w-full items-center justify-start"
									aria-label={`progress: ${progress} / ${goal}`}
								></span>
							</ProgressBar>
						</div>
					</div>
				</div>
			</button>
			<button
				onClick={() => increment()}
				aria-label="increase progress by 1"
				className="group relative -mr-2 h-full shrink-0 justify-end rounded-md p-2 text-f-low after:invisible after:absolute after:-bottom-4 after:left-1/2 after:-translate-x-1/2 after:whitespace-nowrap after:rounded-full after:px-2 after:py-0.5 after:text-xs after:text-f-med after:content-['Log_1'] hover:text-f-high hover:after:visible"
			>
				<Plus width={26} height={26} />
			</button>
			{isDetailsOpen ? (
				<GoalDetails
					toggleDetails={toggleDetails}
					isDetailsOpen={isDetailsOpen}
					goal={goal}
					progress={progress}
					increment={increment}
					reset={reset}
					overflow={overflow}
				/>
			) : (
				""
			)}
		</div>
	);
}
