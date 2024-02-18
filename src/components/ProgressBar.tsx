interface Props {
  progress: number;
  goal: Goal;
  overflow: boolean;
  children?: any;
}

export default function ProgressBar({
  progress,
  goal,
  overflow,
  children,
}: Props) {
  return (
    <>
      <div
        className={`w-full h-full relative rounded-lg flex items-center overflow-hidden border-2 transition-transform border-border ${
          overflow ? "translate-x-2" : ""
        } gradient`}
      >
        <div
          className="absolute inset-y-0 right-0 bg-b-med border-border transition-[width]"
          style={{
            width: `${
              100 -
              (progress <= goal.quantity ? progress / goal.quantity : 1) * 100
            }%`,
            borderLeftWidth: `${
              progress > 0 && progress < goal.quantity ? "2px" : "0"
            }`,
          }}
        />
        {/* dashed vertical portion markers */}
        {[...Array(goal.quantity - 1)].map((_, i) => (
          <span
            className="absolute h-full border-dashed border-border border-l-2 w-0 transition-opacity duration-500"
            style={{
              left: `${((i + 1) / goal.quantity) * 100}%`,
            }}
            key={i}
          ></span>
        ))}
        {children}
      </div>
    </>
  );
}
