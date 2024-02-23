"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import { UserContext } from "./UserProvider";
import { ThemeContext } from "./ThemeProvider";
import GoalDetails from "./GoalDetails";
import ProgressBar from "./ProgressBar";
import { Plus } from "react-feather";
import { useProgress } from "@/utils/firebase-firestore";

interface Props {
  goal: Goal;
  date: string;
}

export default function Goal({ goal, date }: Props) {
  const { user } = useContext(UserContext);
  const { mode, theme } = useContext(ThemeContext);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { progress, increment, reset, overflow } = useProgress(
    user,
    goal,
    date,
  );

  const toggleDetails = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };

  // todo: maybe set programmatically from goals list
  // maximum servings: beverages
  const maxQuantity = 5;

  return (
    <div className="py-2 flex items-center gap-4">
      <button
        className="overflow-visible flex-1 flex items-center gap-4 rounded-md py-4 px-2 -mx-2 hover:text-f-high hover:bg-b-low"
        aria-label="open item details"
        onClick={() => toggleDetails()}
      >
        <div
          className={`${mode === "light" ? "brightness-75" : "brightness-125"}`}
        >
          <Image
            alt=""
            width={36}
            height={36}
            src={`/goals/${goal.icon ?? "beans"}${
              theme === "earthy" ? "-earthy" : "-cosmic"
            }.png`}
          ></Image>
        </div>
        <div className="overflow-visible flex sm:flex-row flex-col sm:items-center gap-y-2 gap-x-8 w-full">
          <div className="grid grid-flow-col items-center justify-start gap-4 flex-1">
            <p className="sm:whitespace-nowrap text-left first-letter:capitalize truncate sm:overflow-visible max-w-full">
              {goal.name}
            </p>
            <div className="whitespace-nowrap bg-capsule font-medium text-xs rounded-full px-2 py-0.5 border-2 border-border ">
              {progress + " / " + goal.quantity}
            </div>
          </div>
          <div className="h-6 flex flex-1 sm:justify-end">
            {" "}
            <div
              className="h-full"
              style={{ width: (goal.quantity / maxQuantity) * 100 + "%" }}
            >
              <ProgressBar progress={progress} goal={goal} overflow={overflow}>
                <span
                  className="w-full flex items-center justify-start z-10"
                  aria-label={`progress: ${progress} / ${goal}`}
                ></span>
              </ProgressBar>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => increment()}
        aria-label="increase progress by 1"
        className="shrink-0 relative group h-full justify-end text-f-low p-2 -mr-2 hover:text-f-high after:content-['Log_1'] after:invisible after:absolute hover:after:visible after:left-1/2 after:-bottom-4 after:text-f-med after:-translate-x-1/2 after:text-xs after:whitespace-nowrap rounded-md after:rounded-full after:px-2 after:py-0.5"
      >
        <Plus width={26} height={26} />
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
