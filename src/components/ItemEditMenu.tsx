"use client";

import { Dialog } from "@headlessui/react";
import { Listbox } from "@headlessui/react";
import { useState } from "react";
import Rotate from "./icons/Rotate";
import X from "./icons/X";
import ChevronDown from "./icons/ChevronDown";
import Check from "./icons/Check";
import Plus from "./icons/Plus";
import Button from "./Button";

interface Props {
  incrementProgress: (amount: number) => void;
  resetProgress: () => void;
  toggleEditMenu: () => void;
  isEditMenuOpen: boolean;
  progress: number;
  need: any;
}

const partialPortions = [
  { fraction: "1/4", value: 0.25 },
  { fraction: "1/2", value: 0.5 },
  { fraction: "3/4", value: 0.75 },
  { fraction: "1", value: 1 },
];

export default function ItemEditMenu({
  incrementProgress,
  resetProgress,
  toggleEditMenu,
  isEditMenuOpen,
  progress,
  need,
}: Props) {
  const [incrementBy, setIncrementBy] = useState(1);
  return (
    <>
      <Dialog open={isEditMenuOpen} onClose={() => toggleEditMenu()}>
        <div className="fixed inset-0 bg-black/80 z-30" aria-hidden="true" />
        <Dialog.Panel>
          <div className="fixed z-40 border-neutral-800 border-2 bg-b-med inset-[10%] rounded-xl p-8 shadow-lg shadow-black">
            <button
              className="z-50 absolute top-8 right-8 text-f-low hover:text-f-high"
              onClick={toggleEditMenu}
            >
              <X />
            </button>
            <div className="relative w-full h-full overflow-y-auto">
              <div className="mb-8">
                <Dialog.Title className="mb-1 text-xl font-bold first-letter:capitalize">
                  {need.name}
                </Dialog.Title>
                <div className="text-f-med mb-4 text-sm flex flex-row items-center ">
                  Progress: {progress} / {need.goal}
                  <span className="pl-2 text-f-med">
                    {progress >= need.goal && <Check size={16} />}
                  </span>
                </div>
                <button
                  className="w-full h-3 relative mb-2 rounded-md flex items-center overflow-hidden bg-gradient-to-r from-indigo-400 to-orange-200 via-pink-200 border-b-high border-2"
                  aria-label="increase progress by 1"
                  onClick={() => incrementProgress(1)}
                >
                  <div
                    className="absolute top-0 bottom-0 right-0 bg-b-med transition-[width]"
                    style={{ width: `${100 - (progress / need.goal) * 100}%` }}
                  />
                </button>
              </div>
              <button
                onClick={() => resetProgress()}
                className="text-sm text-f-med flex flex-row gap-2 mb-8"
              >
                <Rotate size={18} /> <span>Reset progress</span>
              </button>
              <h3 className="font-bold text-sm mb-4">Log progess</h3>
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
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
