import { Check, ChevronDown } from "react-feather";
import { Listbox as UIListbox } from "@headlessui/react";

interface Props {
  title: string;
  value: string;
  onChange: (e) => void;
  options: string[];
}
export default function Listbox({ title, value, onChange, options }: Props) {
  return (
    <div className="flex flex-row items-center justify-start h-10">
      <div className="h-full">
        <UIListbox value={value} onChange={onChange}>
          <UIListbox.Button className="rounded-lg h-full pl-3 pr-10 text-left shadow-md focus:outline-none border-2 border-border  focus-visible:ring-2 focus-visible:ring-f-high focus-visible:ring-offset-2 focus-visible:ring-offset-b-low sm:text-sm relative">
            <span className="block truncate">{title}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown aria-hidden="true" />
            </span>
          </UIListbox.Button>
          <UIListbox.Options className="absolute mt-1 max-h-60 overflow-auto rounded-md py-1 border-2 border-border bg-b-med shadow-lg focus:outline-none sm:text-sm">
            {options.map((option) => (
              <UIListbox.Option
                key={option}
                value={option}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-b-med text-f-high" : "text-f-med"
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-f-high">
                        <Check aria-hidden="true" />
                      </span>
                    ) : null}
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
