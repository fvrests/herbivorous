"use client";

import { useState } from "react";
import ItemEditMenu from "./ItemEditMenu";
import Edit from "./icons/Edit";
import Check from "./icons/Check";

interface Props {
  // todo: type
  need: any;
}

export default function NeedsItem({ need }: Props) {
  const [progress, setProgress] = useState(0);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);

  const incrementProgress = (amount: number) => {
    // if (progress < need.goal) {
    setProgress(progress + amount);
    // }
  };

  const resetProgress = () => {
    setProgress(0);
  };

  const toggleEditMenu = () => {
    setIsEditMenuOpen(!isEditMenuOpen);
  };

  return (
    <div className="flex flex-row justify-between items-center max-w-full text-f-high">
      <button
        className="w-full h-20 relative mb-2 rounded-xl flex flex-row items-center justify-between overflow-hidden bg-gradient-to-r from-indigo-400 to-orange-200 via-pink-200"
        aria-label="increase progress by 1"
        onClick={() => incrementProgress(1)}
      >
        <div className="flex flex-row items-center">
          <div
            className="absolute top-0 bottom-0 right-0 bg-b-med transition-[width]"
            style={{
              width: `${
                100 - (progress <= need.goal ? progress / need.goal : 1) * 100
              }%`,
            }}
          />
          {[...Array(need.goal)].map((_, i) => (
            <span
              className="absolute h-24 border-dashed border-neutral-700 border-l-2 w-0 transition-opacity duration-500"
              style={{
                left: `${((i + 1) / need.goal) * 100}%`,
                opacity: `${progress < i + 1 ? 1 : 0}`,
              }}
            ></span>
          ))}
          <div className="z-10 ml-6 font-bold first-letter:capitalize">
            {need.name}
          </div>
          <div className="z-10 ml-4">
            {progress} / {need.goal}
          </div>
        </div>
        <span className="p-8">{progress >= need.goal && <Check />}</span>
      </button>
      <button
        onClick={toggleEditMenu}
        aria-label="edit goal"
        className="h-full flex flex-row items-center ml-8 text-f-low hover:text-f-high"
      >
        <Edit />
      </button>

      {isEditMenuOpen ? (
        <ItemEditMenu
          toggleEditMenu={toggleEditMenu}
          incrementProgress={incrementProgress}
          isEditMenuOpen={isEditMenuOpen}
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
