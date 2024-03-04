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
    <div className="flex flex-row items-center justify-start h-10">
      <div className="h-full">
        <UIListbox value={value} onChange={onChange}>
          <UIListbox.Button className="rounded-lg h-full pl-3 pr-10 text-left shadow-sm focus:outline-none border-2 border-border  focus-visible:ring-2 focus-visible:ring-f-high focus-visible:ring-offset-2 focus-visible:ring-offset-b-med sm:text-sm relative">
            <span className="block truncate first-letter:capitalize">
              {title}
            </span>
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
                  `relative cursor-pointer select-none py-2 px-4 ${
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
                      <span className="first-letter:capitalize truncate ">
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
