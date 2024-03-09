"use client";

import { getDateString } from "@/utils/date";
import { addDays, subDays, format, isToday } from "date-fns";
import goals from "@/app/goals.json";
import Goal from "@/components/Goal";
import Link from "@/components/Link";

export default function DayView({
	params,
}: {
	params: { dateString: string };
}) {
	const pageDate = new Date(params.dateString + "T00:00:00") ?? new Date();
	const prevDate = subDays(pageDate, 1);
	const nextDate = addDays(pageDate, 1);
	const displayDate = format(pageDate, "EEEE, MMM do");

	return (
		<>
			<div className="mb-16 grid w-full auto-cols-max grid-cols-3 items-end justify-between gap-4 text-sm font-semibold tracking-tighter">
				<span className="justify-self-start">
					↤&nbsp;
					<Link href={`/day/${getDateString(prevDate)}`}>
						<span>{format(prevDate, "do")}</span>
					</Link>
				</span>
				<span className="justify-self-center whitespace-nowrap text-lg">
					{displayDate}
				</span>
				{!isToday(pageDate) ? (
					<span className="justify-self-end">
						<Link href={`/day/${getDateString(nextDate)}`}>
							<span>{format(nextDate, "do")}</span>
						</Link>
						&nbsp;↦
					</span>
				) : null}
			</div>
			<div>
				{goals.map((goal) => (
					<div
						key={goal.name}
						className="border-b-[1px] border-t-[1px] border-border-low first:border-t-0 last:border-b-0"
					>
						<Goal goal={goal} date={params.dateString ?? getDateString()} />
					</div>
				))}
			</div>
		</>
	);
}
