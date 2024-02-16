"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import { UserContext } from "./UserProvider";
import { ThemeContext } from "./ThemeProvider";
import GoalDetails from "./GoalDetails";
import ProgressBar from "./ProgressBar";
import { Check, Plus } from "react-feather";
import { useUserData, useProgress } from "@/utils/firebase-firestore";

interface Props {
  goal: Goal;
  date: string;
}

export default function Goal({ goal, date }: Props) {
  const { user } = useContext(UserContext);
  const { mode } = useContext(ThemeContext);
  const { isLoading } = useUserData();
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
    <div className="w-full flex flex-row items-center max-w-full gap-x-4 py-4">
      <button
        className="w-full flex flex-row items-center max-w-full gap-x-4"
        aria-label="open item details"
        onClick={() => toggleDetails()}
      >
        {!isLoading && (
          <div className="mr-4 shrink-0">
            <Image
              alt=""
              width={36}
              height={36}
              src={`/goals/${goal.icons[0] ?? "beans"}${
                mode === "light" ? "-dark" : ""
              }.png`}
            ></Image>
          </div>
        )}
        <div className="w-full flex flex-col sm:flex-row sm:items-center max-w-full gap-4">
          <div className="flex w-full flex-row items-center gap-x-4">
            <span className="text-left first-letter:capitalize font-bold">
              {goal.name}
            </span>
            <span className="whitespace-nowrap bg-capsule font-semibold text-xs rounded-full px-2 py-1">
              {progress + " / " + goal.quantity}
            </span>
          </div>
          {progress < goal.quantity && (
            <span style={{ width: (goal.quantity / maxQuantity) * 100 + "%" }}>
              <ProgressBar progress={progress} goal={goal} overflow={overflow}>
                <span
                  className="h-8 w-full flex items-center justify-start z-10"
                  aria-label={`progress: ${progress} / ${goal}`}
                ></span>
              </ProgressBar>
            </span>
          )}
          {progress >= goal.quantity && <Check size={24} />}
        </div>
      </button>
      <button
        onClick={() => increment()}
        aria-label="increase progress by 1"
        className="relative group ml-auto h-full justify-end place-items-center text-f-low hover:text-f-high after:content-['Log_1'] after:invisible hover:after:visible after:absolute after:-bottom-4 after:w-full after:left-0 after:right-0 after:mx-auto after:text-xs after:whitespace-nowrap"
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
