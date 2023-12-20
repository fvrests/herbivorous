"use client";

import { useContext, useState } from "react";
import { UserContext } from "./UserProvider";
import GoalDetails from "./GoalDetails";
import ProgressBar from "./ProgressBar";
import { Check, Plus } from "react-feather";
import { useUserData, useProgress } from "@/app/firebase-firestore";

interface Props {
  goal: Goal;
}

export default function Goal({ goal }: Props) {
  const { user } = useContext(UserContext);
  let { isLoading } = useUserData();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { progress, increment, overflow } = useProgress(user, goal);

  const toggleDetails = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };

  if (!isLoading) {
    return (
      <div className="flex flex-row justify-between items-center max-w-full text-f-high">
        <button
          className="h-24 w-full"
          aria-label="open item details"
          onClick={() => toggleDetails()}
        >
          <ProgressBar
            progress={progress}
            goal={goal}
            overflow={overflow}
            hoverable={true}
          >
            <div className="flex justify-between flex-row items-center w-full">
              <div className="flex flex-row items-center w-full">
                <img
                  className="z-10 h-12 ml-6"
                  src={`./goals/${goal.icons[0] ?? "beans"}.png`}
                />
                <div className="z-10 ml-6 font-bold first-letter:capitalize whitespace-nowrap truncate">
                  {goal.name}
                </div>
                <div className="z-10 ml-4 shrink-0">
                  {progress} / {goal.quantity}
                </div>
              </div>
              <div className="p-8">
                {progress >= goal.quantity && <Check />}
              </div>
            </div>
          </ProgressBar>
        </button>

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
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
