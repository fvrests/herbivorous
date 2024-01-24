interface Props {
  children?: React.ReactNode;
  classes?: string;
  secondary?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  children,
  onClick,
  classes,
  type,
  disabled,
  secondary,
}: Props) {
  return (
    <button
      className={`rounded-lg h-10 text-f-med hover:text-f-high px-4 shadow-md focus:outline-none border-2 focus-visible:border-indigo-400 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-indigo-300 text-xs sm:text-sm flex items-center justify-center ${classes} ${
        secondary
          ? "border-transparent hover:underline"
          : "border-border hover:border-f-med"
      } `}
      onClick={() => onClick && onClick()}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
