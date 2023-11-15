"use client";

import { Dialog } from "@headlessui/react";
import { RadioGroup } from "@headlessui/react";
import useOptions from "../app/store";
import { useEffect } from "react";

import RadioGroupOption from "./RadioGroupOption";

import Button from "./Button";
import Check from "./icons/Check";
import Rotate from "./icons/Rotate";
import X from "./icons/X";

interface Props {
  incrementProgress: (amount: number) => void;
  resetProgress: () => void;
  toggleDetails: () => void;
  isDetailsOpen: boolean;
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
  toggleDetails,
  isDetailsOpen,
  progress,
  need,
}: Props) {
  const [options, setOptions] = useOptions();

  useEffect(() => {
    console.log({ options, setOptions });
  }, [options]);

  const activeUnits = options.units === "metric" ? "metric" : "imperial";

  return (
    <>
      <Dialog open={isDetailsOpen} onClose={() => toggleDetails()}>
        <div className="fixed inset-0 bg-black/80 z-30" aria-hidden="true" />
        <Dialog.Panel>
          <div className="fixed z-40 border-neutral-800 border-2 bg-b-med inset-[10%] rounded-xl p-8 shadow-lg shadow-black">
            <button
              className="z-50 absolute top-8 right-8 text-f-low hover:text-f-high"
              aria-label="close details"
              onClick={toggleDetails}
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
                <div className="w-full h-3 relative mb-2 rounded-md flex items-center overflow-hidden bg-gradient-to-r from-indigo-400 to-orange-200 via-pink-200 border-b-high border-2">
                  <div
                    className="absolute top-0 bottom-0 right-0 bg-b-med transition-[width]"
                    style={{
                      width: `${
                        100 -
                        (progress <= need.goal ? progress / need.goal : 1) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
              <h3 className="font-bold text-sm mb-4">Units</h3>
              {/* todo: cursor-pointer on radio items */}
              {/* todo: use fraction names for partial-unit suggestions */}
              {/* fix: units setting doesn't persist to other need menus*/}
              <RadioGroup
                value={options.units}
                onChange={(newValue) =>
                  setOptions({ ...options, units: newValue })
                }
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
              <h3 className="font-bold text-sm mb-4">Suggestions</h3>
              <ul className="text-sm mb-8">
                {need.suggestions.map((suggestion) => (
                  <li key={suggestion.name} className="mb-2">
                    {suggestion.portion[activeUnits].quantity}{" "}
                    {suggestion.portion[activeUnits].unit} {suggestion.name}
                  </li>
                ))}
                <li></li>
              </ul>
              <h3 className="font-bold text-sm mb-4">Log progess</h3>
              <div className="mb-8 flex flex-row items-center justify-start">
                {partialPortions.map((partial) => (
                  <Button
                    classes="ml-4 first:ml-0"
                    key={partial.fraction}
                    onClick={() => incrementProgress(partial.value)}
                  >
                    {partial.fraction} serving
                  </Button>
                ))}
              </div>

              <h3 className="font-bold text-sm mb-4">Reset progess</h3>
              <Button
                onClick={() => resetProgress()}
                classes="flex flex-row gap-2 mb-8"
              >
                <Rotate size={14} /> <span>Reset</span>
              </Button>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
