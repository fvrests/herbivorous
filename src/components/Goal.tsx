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
    <div className="py-4 sm:py-2 flex items-center gap-4">
      <button
        className="flex-1 flex items-center gap-4"
        aria-label="open item details"
        onClick={() => toggleDetails()}
      >
        <Image
          alt=""
          width={36}
          height={36}
          src={`/goals/${goal.icons[0] ?? "beans"}${
            mode === "light" ? "-dark" : ""
          }.png`}
        ></Image>
        <div className="sm:truncate flex sm:flex-row flex-col sm:items-center gap-y-2 gap-x-8 w-full">
          <div className="grid grid-flow-col items-center justify-start gap-4">
            <p className="text-left first-letter:capitalize font-semibold truncate max-w-full">
              {goal.name}
            </p>
            <div className="whitespace-nowrap bg-capsule font-semibold text-xs rounded-full px-2 py-0.5">
              {progress + " / " + goal.quantity}
            </div>
          </div>
          <div className="h-6 flex-1 flex sm:justify-end">
            {" "}
            {progress < goal.quantity && (
              <div
                className="h-full"
                style={{ width: (goal.quantity / maxQuantity) * 100 + "%" }}
              >
                {!isLoading && progress < goal.quantity && (
                  <ProgressBar
                    progress={progress}
                    goal={goal}
                    overflow={overflow}
                  >
                    <span
                      className="w-full flex items-center justify-start z-10"
                      aria-label={`progress: ${progress} / ${goal}`}
                    ></span>
                  </ProgressBar>
                )}
              </div>
            )}
            <span className="h-full flex items-center">
              {progress >= goal.quantity && <Check size={24} />}
            </span>
          </div>
        </div>
      </button>
      <button
        onClick={() => increment()}
        aria-label="increase progress by 1"
        className="shrink-0 relative group h-full justify-end text-f-med p-2 hover:text-f-high after:content-['Log_1'] after:invisible after:absolute hover:after:visible after:left-1/2 after:-bottom-6 after:text-f-med after:-translate-x-1/2 after:text-xs after:whitespace-nowrap border-2 border-border-low rounded-full"
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

  return (
    <>
      <div className="flex items-center gap-x-4 py-4">
        <button
          className="w-full flex rounded-xl items-center gap-x-4"
          aria-label="open item details"
          onClick={() => toggleDetails()}
        >
          <Image
            alt=""
            width={36}
            height={36}
            src={`/goals/${goal.icons[0] ?? "beans"}${
              mode === "light" ? "-dark" : ""
            }.png`}
          ></Image>
          <div className="w-full inline-flex flex-col sm:flex-row sm:items-center gap-y-4 gap-x-8 truncate">
            <div className="inline-flex items-center gap-x-2">
              <div className="truncate max-w-full first-letter:capitalize font-semibold">
                {goal.name}
              </div>
              <div className="bg-capsule font-semibold text-xs rounded-full px-2 py-0.5">
                {progress + " / " + goal.quantity}
              </div>
            </div>
            <div className="flex-1 flex sm:justify-end">
              <>
                {progress < goal.quantity && (
                  <div
                    style={{ width: (goal.quantity / maxQuantity) * 100 + "%" }}
                  >
                    {!isLoading && progress < goal.quantity && (
                      <ProgressBar
                        progress={progress}
                        goal={goal}
                        overflow={overflow}
                      >
                        <span
                          className="h-6 w-full flex items-center justify-start z-10"
                          aria-label={`progress: ${progress} / ${goal}`}
                        ></span>
                      </ProgressBar>
                    )}
                  </div>
                )}
                <span className="h-6">
                  {progress >= goal.quantity && <Check size={24} />}
                </span>
              </>
            </div>
          </div>
        </button>
        <button
          onClick={() => increment()}
          aria-label="increase progress by 1"
          className="shrink-0 relative group h-full justify-end text-f-med p-2 hover:text-f-high after:content-['Log_1'] after:invisible after:absolute hover:after:visible after:left-1/2 after:-bottom-6 after:text-f-med after:-translate-x-1/2 after:text-xs after:whitespace-nowrap border-2 border-border-low rounded-full"
        >
          <Plus width={26} height={26} />
        </button>
      </div>
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
    </>
  );
}
