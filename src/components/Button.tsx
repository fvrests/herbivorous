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
			className={`flex h-10 items-center justify-center rounded-xl border-2 px-4 text-sm text-f-med shadow-sm hover:text-f-high disabled:opacity-50 ${classes} ${
				secondary
					? "border-transparent hover:underline"
					: "hover:border-border-high border-border"
			} `}
			onClick={() => onClick && onClick()}
			type={type}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
