import { Disclosure as UIDisclosure, Transition } from "@headlessui/react";
import text from "@/app/styles/text.module.css";
import { ChevronDown, ChevronUp } from "react-feather";

export default function Disclosure() {
	return (
		<div className="border-detail mb-8 w-full rounded-xl border-2 p-2">
			<UIDisclosure defaultOpen={true}>
				{({ open }) => (
					<>
						<UIDisclosure.Button className="flex w-full flex-row items-center justify-between gap-2 rounded-lg p-2 text-sm font-semibold tracking-tighter hover:bg-b-med">
							<span className={text.label}>Types</span>
							{open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
						</UIDisclosure.Button>
						<Transition
							enter="transition duration-100 ease-out"
							enterFrom="transform scale-95 opacity-0"
							enterTo="transform scale-100 opacity-100"
							leave="transition duration-75 ease-out"
							leaveFrom="transform scale-100 opacity-100"
							leaveTo="transform scale-95 opacity-0"
						>
							<UIDisclosure.Panel className="mt-2 w-full px-2 text-sm"></UIDisclosure.Panel>
						</Transition>
					</>
				)}
			</UIDisclosure>
		</div>
	);
}
