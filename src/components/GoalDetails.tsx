import { useState, useEffect, useContext } from "react";
import { Check, RotateCcw, X, Plus } from "react-feather";
import { Dialog, RadioGroup } from "@headlessui/react";
import Image from "next/image";
import { useUserData, updateUserData } from "@/utils/firebase-firestore";
import { getLocalStorage, updateLocalSettings } from "@/utils/localStorage";
import ProgressBar from "@/components/ProgressBar";
import RadioGroupOption from "@/components/RadioGroupOption";
import { UserContext } from "@/components/UserProvider";
import text from "@/app/styles/text.module.css";
import { ThemeContext } from "./ThemeProvider";

interface Props {
	toggleDetails: () => void;
	isDetailsOpen: boolean;
	goal: Goal;
	progress: number;
	increment: (amount?: number | undefined) => void;
	reset: () => void;
	overflow: boolean;
}

const parseQuantity = (quantity: number | string) => {
	if (typeof quantity === "number") {
		let remainder = quantity % 1;
		if (fractionsMap.has(quantity)) {
			return fractionsMap.get(quantity);
		} else if (remainder !== 1 && fractionsMap.has(remainder)) {
			return `${Math.floor(quantity)} ${fractionsMap.get(remainder)}`;
		}
	}
	return quantity;
};
const unitTypes = ["metric", "imperial"];

const fractionsMap = new Map([
	[0.25, "¼"],
	[0.5, "½"],
	[0.75, "¾"],
	[1, "1"],
]);

export default function GoalDetails({
	toggleDetails,
	isDetailsOpen,
	goal,
	progress,
	increment,
	reset,
	overflow,
}: Props) {
	let localData: UserData | null = getLocalStorage("herbivorous");
	let { user } = useContext(UserContext);
	let { userData } = useUserData();
	const { mode } = useContext(ThemeContext);

	const [units, setUnits] = useState(
		userData?.settings?.units || localData?.settings?.units || "metric",
	);

	const [incrementBy, setIncrementBy] = useState(1);

	useEffect(() => {
		setUnits(
			userData?.settings?.units || localData?.settings?.units || "metric",
		);
	}, [userData, localData]);

	const handleChangeUnits = (newValue: "metric" | "imperial") => {
		if (user) {
			updateUserData(user.uid, { settings: { units: newValue } });
		} else {
			updateLocalSettings({ units: newValue });
		}
		setUnits(newValue);
	};

	return (
		<>
			<Dialog open={isDetailsOpen} onClose={() => toggleDetails()}>
				<div
					className="fixed inset-0 z-30 cursor-pointer bg-b-low opacity-60"
					aria-hidden="true"
				/>
				<Dialog.Panel>
					<div className="border-detail fixed inset-[5%] z-40 mx-auto max-w-2xl overflow-y-auto rounded-xl border-2 bg-b-med px-8 pt-8 shadow-lg shadow-b-low sm:inset-[10%]">
						{/* margin-bottom affects entire menu content */}
						<div className="relative mb-12 w-full">
							{/* header section */}
							<div className="mb-6">
								<div className="mb-8 flex w-full items-start justify-between">
									<div className="flex items-center gap-6">
										<div className="rounded-2xl">
											<div
												className={`${mode === "light" ? "brightness-75" : "brightness-125"}`}
											>
												<Image
													alt=""
													width={36}
													height={36}
													src={`/goals/${goal.icon ?? "beans"}-earthy.png`}
												></Image>
											</div>
										</div>
										<div className="flex flex-col items-start">
											<Dialog.Title className="mb-1 text-xl font-semibold tracking-tighter first-letter:capitalize">
												{goal.name}
											</Dialog.Title>
											<div className="flex flex-row items-center text-sm text-f-med ">
												Progress: {progress} / {goal.quantity}
												<span className="pl-2 text-f-high">
													{progress >= goal.quantity && <Check size={16} />}
												</span>
											</div>
										</div>
									</div>
									<button
										className="-mr-2 rounded-md p-2 text-f-low hover:text-f-high"
										aria-label="close details"
										onClick={toggleDetails}
									>
										<X />
									</button>
								</div>
								<div className="h-6 w-full">
									<ProgressBar
										goal={goal}
										progress={progress}
										overflow={overflow}
									/>
								</div>
							</div>
							<div className="mb-12">
								{/* <h3 className={text.label}>Log progress</h3> */}
								<div className="flex items-center justify-between gap-2 overflow-x-scroll">
									<div className="flex gap-2">
										{Array.from(fractionsMap.entries()).map(
											([value, label], i) => {
												const selected = incrementBy === value;
												return (
													<button
														key={value}
														onClick={() => {
															if (incrementBy !== value) {
																setIncrementBy(value);
															} else {
																increment(value);
															}
														}}
														className={`flex cursor-pointer items-center gap-2 text-nowrap rounded-xl border-2 px-3 py-1 hover:border-border-low hover:text-f-high sm:px-4 ${selected ? "border-capsule bg-capsule text-f-high" : "border-detail text-f-low"}`}
													>
														{selected && <Plus size={14} />}
														{`${selected ? "Log" : ""} ${label}`}
													</button>
												);
											},
										)}
									</div>
									<button
										onClick={() => reset()}
										className={`hover:bg-b-warn hover:border-f-warn-low hover:text-f-warn border-detail flex w-min cursor-pointer flex-row items-center gap-2 rounded-xl border-2 px-4 py-1 text-f-low`}
									>
										<RotateCcw size={14} /> <span>Reset</span>
									</button>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<h3 className={text.label}>Suggestions</h3>
								<RadioGroup
									value={units}
									onChange={(newValue) => handleChangeUnits(newValue)}
									className="mb-4 flex gap-2 text-sm"
								>
									<RadioGroup.Label className="sr-only">Units</RadioGroup.Label>
									{unitTypes.map((unitType: string, i) => (
										<>
											<RadioGroupOption key={unitType} value={unitType} />
											{i < unitTypes.length - 1 && (
												<span className="text-f-low">•</span>
											)}
										</>
									))}
								</RadioGroup>
							</div>
							<ul className="mb-12 text-sm">
								{goal.suggestions.map((suggestion: Suggestion) => (
									<li key={suggestion.name} className="mb-2">
										{parseQuantity(suggestion.portion[units].quantity)}{" "}
										{suggestion.portion[units].unit} {suggestion.name}{" "}
									</li>
								))}
								<li></li>
							</ul>
							<h3 className={text.label}>Types</h3>
							<ul className="mb-12 flex w-full flex-wrap gap-2 text-sm">
								{goal.types?.map((type: string) => (
									<li
										key={type}
										className="rounded-lg bg-capsule px-2 py-1 first-letter:capitalize"
									>
										{type}
									</li>
								))}
							</ul>
						</div>
					</div>
				</Dialog.Panel>
			</Dialog>
		</>
	);
}
