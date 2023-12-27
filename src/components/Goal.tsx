"use client";

import { useContext, useState } from "react";
import { UserContext } from "./UserProvider";
import GoalDetails from "./GoalDetails";
import ProgressBar from "./ProgressBar";
import { Check, Plus } from "react-feather";
import { useProgress } from "@/app/firebase-firestore";

interface Props {
  goal: Goal;
}

export default function Goal({ goal }: Props) {
  const { user } = useContext(UserContext);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { progress, increment, reset, overflow } = useProgress(user, goal);

  const toggleDetails = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };

  return (
    <div className="flex justify-between items-center max-w-full text-f-high">
      <ProgressBar
        progress={progress}
        goal={goal}
        overflow={overflow}
        hoverable={true}
      >
        <button
          className="h-20 w-full flex items-center z-10"
          aria-label="open item details"
          onClick={() => toggleDetails()}
        >
          <img
            className="h-12 ml-4"
            src={`./goals/${goal.icons[0] ?? "beans"}.png`}
          />
          <div className="flex flex-col items-start ml-4 truncate">
            <div className="font-bold first-letter:capitalize truncate max-w-full">
              {goal.name}
            </div>
            <div>
              {progress} / {goal.quantity}
            </div>
          </div>
          <div className="p-8 justify-self-end">
            {progress >= goal.quantity && <Check />}
          </div>
        </button>
      </ProgressBar>

      <button
        onClick={() => increment()}
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
        <GoalDetails
          toggleDetails={toggleDetails}
          isDetailsOpen={isDetailsOpen}
          goal={goal}
          progress={progress}
          increment={increment}
          reset={reset}
          overflow={overflow}
        />
      ) : (
        ""
      )}
    </div>
  );
}
