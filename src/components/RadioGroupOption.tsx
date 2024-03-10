import { RadioGroup } from "@headlessui/react";

interface Props {
	children?: any;
	value?: any;
}
export default function RadioGroupOption({ children, value }: Props) {
	return (
		<RadioGroup.Option
			className={({ checked }) =>
				`${
					checked ? "border-border text-f-med" : "border-border-low text-f-low"
				} flex h-8 cursor-pointer items-center justify-center border-2 px-2 text-xs font-semibold tracking-tighter shadow-sm first:rounded-l-lg last:rounded-r-lg hover:border-border hover:text-f-med [&_*]:cursor-pointer`
			}
			value={value}
		>
			<div>{children}</div>
		</RadioGroup.Option>
	);
}
