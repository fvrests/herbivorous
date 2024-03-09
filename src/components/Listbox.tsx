import { Check, ChevronDown } from "react-feather";
import { Listbox as UIListbox } from "@headlessui/react";

interface Props {
	title: string;
	value: string;
	onChange: (v: string) => void;
	options: string[];
}
export default function Listbox({ title, value, onChange, options }: Props) {
	return (
		<div className="flex h-10 flex-row items-center justify-start">
			<div className="h-full">
				<UIListbox value={value} onChange={onChange}>
					<UIListbox.Button className="relative h-full rounded-lg border-2 border-border pl-3 pr-10 text-left shadow-sm  focus:outline-none focus-visible:ring-2 focus-visible:ring-f-high focus-visible:ring-offset-2 focus-visible:ring-offset-b-med sm:text-sm">
						<span className="block truncate first-letter:capitalize">
							{title}
						</span>
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<ChevronDown aria-hidden="true" />
						</span>
					</UIListbox.Button>
					<UIListbox.Options className="absolute mt-1 max-h-60 overflow-auto rounded-md border-2 border-border bg-b-med py-1 shadow-lg focus:outline-none sm:text-sm">
						{options.map((option) => (
							<UIListbox.Option
								key={option}
								value={option}
								className={({ active }) =>
									`relative cursor-pointer select-none px-4 py-2 ${
										active ? "bg-b-low text-f-high" : "text-f-med"
									}`
								}
							>
								{({ selected }) => (
									<>
										<div
											className={`flex ${
												selected ? "font-medium" : "font-normal"
											}`}
										>
											<span className="truncate first-letter:capitalize ">
												{option}
											</span>
											{selected ? (
												<span className="flex items-center pl-3 text-f-high">
													<Check size="18" aria-hidden="true" />
												</span>
											) : null}
										</div>
									</>
								)}
							</UIListbox.Option>
						))}
					</UIListbox.Options>
				</UIListbox>
			</div>
		</div>
	);
}
