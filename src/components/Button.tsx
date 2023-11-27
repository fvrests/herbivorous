interface Props {
  children?: any;
  classes?: string;
  secondary?: boolean;
  onClick: () => void;
}

export default function Button({
  children,
  onClick,
  classes,
  secondary,
}: Props) {
  return (
    <button
      className={`rounded-lg h-10 text-f-med hover:text-f-high px-4 shadow-md focus:outline-none border-2 focus-visible:border-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-300 text-xs sm:text-sm flex items-center justify-center ${classes} ${
        secondary
          ? "border-transparent hover:underline underline-offset-2"
          : "border-b-high hover:border-f-med"
      }`}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
}
