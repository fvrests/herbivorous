import { Listbox } from "@headlessui/react";
import { ChevronDown } from "./icons/ChevronDown";

export default function Listbox() {
  return (
    <div className="flex flex-row items-center justify-start h-10">
      <div className="w-36 h-full">
        <Listbox value={incrementBy} onChange={setIncrementBy}>
          <Listbox.Button className="w-full rounded-lg h-full pl-3 pr-10 text-left shadow-md focus:outline-none border-2 border-b-high focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm relative">
            <span className="block truncate">
              {
                partialPortions.filter(
                  (portion) => portion.value === incrementBy,
                )[0].fraction
              }
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 max-h-60 w-36 overflow-auto rounded-md py-1 border-2 border-b-high shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {partialPortions.map((partial) => (
              <Listbox.Option
                key={partial.fraction}
                value={partial.value}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-b-high text-f-high" : "text-f-med"
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
                      {partial.fraction}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-f-high">
                        <Check aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
      <button
        className="ml-2 border-2 border-b-high rounded-lg h-full w-12 flex items-center justify-center"
        onClick={() => incrementProgress(incrementBy)}
      >
        <Plus />
      </button>
    </div>
  );
}
