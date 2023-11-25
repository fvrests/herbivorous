"use client";

import { useState } from "react";
import NeedsItemDetails from "./NeedsItemDetails";
import { Check, Plus } from "react-feather";

interface Props {
  need: NeedsItem;
}

export default function NeedsItem({ need }: Props) {
  const [progress, setProgress] = useState(0);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const incrementProgress = (amount: number) => {
    setProgress(progress + amount);
  };

  const resetProgress = () => {
    setProgress(0);
  };

  const toggleDetails = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };

  return (
    <div className="flex flex-row justify-between items-center max-w-full text-f-high">
      <button
        className="w-full h-20 relative mb-2 rounded-xl flex flex-row items-center justify-between bg-gradient-to-r from-indigo-400 to-orange-200 via-pink-200 overflow-hidden border-2 border-b-high hover:border-f-med opacity-95 hover:opacity-100"
        aria-label="open item details"
        onClick={() => toggleDetails()}
      >
        <div className="flex flex-row items-center">
          {/* todo: wiggle bar on increment if progress is full */}
          <div
            className="absolute inset-y-0 right-0 bg-b-low hover:bg-b-med transition-[width]"
            style={{
              width: `${
                100 - (progress <= need.goal ? progress / need.goal : 1) * 100
              }%`,
            }}
          />
          {/* dashed vertical portion markers */}
          {[...Array(need.goal - 1)].map((_, i) => (
            <span
              className="absolute h-24 border-dashed border-neutral-700 border-l-2 w-0 transition-opacity duration-500"
              style={{
                left: `${((i + 1) / need.goal) * 100}%`,
                opacity: `${progress < i + 1 ? 1 : 0}`,
              }}
            ></span>
          ))}
          {/* fix: doesn't truncate enough to show progress on long items / truncates early */}
          <div className="z-10 ml-6 font-bold first-letter:capitalize whitespace-nowrap truncate">
            {need.name}
          </div>
          <div className="z-10 ml-4 shrink-0">
            {progress} / {need.goal}
          </div>
        </div>
        <span className="p-8">{progress >= need.goal && <Check />}</span>
      </button>
      <button
        onClick={() => incrementProgress(1)}
        aria-label="increase progress by 1"
        className="group ml-4 grid grid-rows-3 shrink-0 h-full relative justify-end place-items-center text-f-low hover:text-f-high"
      >
        <span className="row-start-2">
          <Plus />
        </span>
        <span className="row-start-3 w-full text-xs invisible group-hover:visible">
          Log 1
        </span>
      </button>

      {isDetailsOpen ? (
        <NeedsItemDetails
          toggleDetails={toggleDetails}
          incrementProgress={incrementProgress}
          isDetailsOpen={isDetailsOpen}
          resetProgress={resetProgress}
          progress={progress}
          need={need}
        />
      ) : (
        ""
      )}
    </div>
  );
}
