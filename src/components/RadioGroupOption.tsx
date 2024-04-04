import { RadioGroup } from "@headlessui/react";

interface Props {
	children?: any;
	key: string | number;
	value: any;
	label?: any;
}
// todo: should inner label (in li) be a radiogroup.label?

export default function RadioGroupOption({
	children,
	key,
	value,
	label,
}: Props) {
	return (
		<RadioGroup.Option
			key={key}
			value={value}
			className="inline list-none rounded-sm"
		>
			{({ checked }) => (
				<div className="relative cursor-pointer">
					<li
						className={`${
							checked
								? "text-f-high underline decoration-wavy"
								: "text-f-low hover:text-f-med"
						} rounded-md px-1 first-letter:uppercase`}
					>
						{label ?? value}
					</li>
				</div>
			)}
		</RadioGroup.Option>
	);
}
