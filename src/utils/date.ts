import { lightFormat } from "date-fns";

export const getDateString = (date = new Date(), offsetOverride?: number) => {
	// todo: add feature to settings to allow offset override
	return lightFormat(date, "yyyy-MM-dd");
};
