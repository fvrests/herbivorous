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
				className={`relative flex h-full w-full items-center overflow-hidden rounded-lg border-2 border-border transition-transform ${
					overflow ? "translate-x-1" : ""
				} gradient`}
			>
				<div
					className="absolute inset-y-0 right-0 border-border bg-b-med transition-[width]"
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
						className="absolute h-full w-0 border-l-2 border-dashed border-border transition-opacity duration-500"
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
