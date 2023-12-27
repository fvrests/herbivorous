import { useUserData } from "@/app/firebase-firestore";

interface Props {
  progress: number;
  goal: Goal;
  overflow: boolean;
  children?: any;
  hoverable?: boolean;
}

export default function ProgressBar({
  progress,
  goal,
  overflow,
  hoverable,
  children,
}: Props) {
  let { isLoading } = useUserData();
  return (
    <>
      <div
        className={`w-full h-full relative mb-2 rounded-xl flex items-center overflow-hidden bg-gradient-to-r from-indigo-400 to-orange-200 via-pink-200 border-b-high border-2 transition-transform ${
          overflow ? "translate-x-2" : ""
        } ${
          hoverable
            ? "border-b-high hover:border-f-low opacity-95 hover:opacity-100"
            : "border-b-high"
        }`}
      >
        <div
          className="absolute inset-y-0 right-0 bg-b-med transition-[width]"
          style={{
            width: `${
              100 -
              (progress <= goal.quantity ? progress / goal.quantity : 1) * 100
            }%`,
          }}
        />
        {/* dashed vertical portion markers */}
        {[...Array(goal.quantity - 1)].map((_, i) => (
          <span
            className="absolute h-full border-dashed border-neutral-700 border-l-2 w-0 transition-opacity duration-500"
            style={{
              left: `${((i + 1) / goal.quantity) * 100}%`,
              opacity: `${progress < i + 1 ? 1 : 0}`,
            }}
            key={i}
          ></span>
        ))}
        {children}
      </div>
    </>
  );
}
