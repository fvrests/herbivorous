import { useState, useEffect, useContext } from "react";
import { Check, ChevronDown, ChevronUp, RotateCcw, X } from "react-feather";
import { Dialog, RadioGroup, Disclosure, Transition } from "@headlessui/react";
import { useUserData, updateUserData } from "@/utils/firebase-firestore";
import { getLocalStorage, updateLocalSettings } from "@/utils/localStorage";
import ProgressBar from "@/components/ProgressBar";
import RadioGroupOption from "@/components/RadioGroupOption";
import Button from "@/components/Button";
import { UserContext } from "@/components/UserProvider";
import text from "@/app/styles/text.module.css";

interface Props {
	toggleDetails: () => void;
	isDetailsOpen: boolean;
	goal: Goal;
	progress: number;
	increment: (amount?: number | undefined) => void;
	reset: () => void;
	overflow: boolean;
}

const fractionsMap = new Map([
	[0.25, "¼"],
	[0.5, "½"],
	[0.75, "¾"],
	[1, "1"],
]);

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

	const [units, setUnits] = useState(
		userData?.settings?.units || localData?.settings?.units || "metric",
	);

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
					className="fixed inset-0 z-30 bg-b-low opacity-60"
					aria-hidden="true"
				/>
				<Dialog.Panel>
					<div className="fixed inset-[5%] z-40 overflow-y-auto rounded-xl border-2 border-border-low bg-b-med px-8 pt-8 shadow-lg shadow-b-low">
						{/* margin-bottom affects entire menu content */}
						<div className="relative mb-8 w-full">
							{/* header section */}
							<div className="mb-8">
								<div className="flex w-full items-center justify-between">
									<Dialog.Title className="mb-1 text-xl font-semibold tracking-tighter first-letter:capitalize">
										{goal.name}
									</Dialog.Title>
									<button
										className="-mr-2 rounded-md p-2 text-f-low hover:text-f-high"
										aria-label="close details"
										onClick={toggleDetails}
									>
										<X />
									</button>
								</div>
								<div className="mb-4 flex flex-row items-center text-sm text-f-med ">
									Progress: {progress} / {goal.quantity}
									<span className="pl-2 text-f-high">
										{progress >= goal.quantity && <Check size={16} />}
									</span>
								</div>
								<div className="h-3 w-full">
									<ProgressBar
										goal={goal}
										progress={progress}
										overflow={overflow}
									/>
								</div>
							</div>
							<h3 className={text.label}>Log progress (servings)</h3>
							<div className="mb-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
								<div className="flex flex-wrap gap-2">
									{Array.from(fractionsMap.entries()).map((entry) => (
										<Button key={entry[0]} onClick={() => increment(entry[0])}>
											+ {entry[1]}
										</Button>
									))}
									{progress < goal.quantity &&
									!fractionsMap.has(goal.quantity - progress) ? (
										<Button onClick={() => increment(goal.quantity - progress)}>
											All (+ {parseQuantity(goal.quantity - progress)})
										</Button>
									) : (
										""
									)}
								</div>
								<Button
									onClick={() => reset()}
									classes="flex flex-row gap-2 w-min"
								>
									<RotateCcw size={14} /> <span>Reset</span>
								</Button>
							</div>
							<h3 className={text.label}>Units</h3>
							<RadioGroup
								value={units}
								onChange={(newValue) => handleChangeUnits(newValue)}
							>
								<RadioGroup.Label className="sr-only">Units</RadioGroup.Label>
								<div className="mb-8 flex flex-row">
									<RadioGroupOption value="metric">
										<RadioGroup.Label>Metric</RadioGroup.Label>
									</RadioGroupOption>
									<RadioGroupOption value="imperial">
										<RadioGroup.Label>Imperial</RadioGroup.Label>
									</RadioGroupOption>
								</div>
							</RadioGroup>
							<h3 className={text.label}>Suggestions</h3>
							<ul className="mb-8 text-sm">
								{goal.suggestions.map((suggestion: Suggestion) => (
									<li key={suggestion.name} className="mb-2">
										{parseQuantity(suggestion.portion[units].quantity)}{" "}
										{suggestion.portion[units].unit} {suggestion.name}{" "}
									</li>
								))}
								<li></li>
							</ul>
							<div className="-mx-2 mb-8 w-full rounded-xl border-2 border-border-low p-2">
								<Disclosure defaultOpen={true}>
									{({ open }) => (
										<>
											<Disclosure.Button className="flex w-full flex-row items-center justify-between gap-2 rounded-lg p-2 text-sm font-semibold tracking-tighter hover:bg-b-med">
												<span>Types</span>
												{open ? (
													<ChevronUp size={16} />
												) : (
													<ChevronDown size={16} />
												)}
											</Disclosure.Button>
											<Transition
												enter="transition duration-100 ease-out"
												enterFrom="transform scale-95 opacity-0"
												enterTo="transform scale-100 opacity-100"
												leave="transition duration-75 ease-out"
												leaveFrom="transform scale-100 opacity-100"
												leaveTo="transform scale-95 opacity-0"
											>
												<Disclosure.Panel className="mt-2 w-full px-2 text-sm">
													<ul>
														{goal.types?.map((type: string) => (
															<li
																key={type}
																className="mb-2 first-letter:capitalize"
															>
																{type}
															</li>
														))}
													</ul>
												</Disclosure.Panel>
											</Transition>
										</>
									)}
								</Disclosure>
							</div>
						</div>
					</div>
				</Dialog.Panel>
			</Dialog>
		</>
	);
}
