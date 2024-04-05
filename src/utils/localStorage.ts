import { getDateString } from "@/utils/date";

export const getLocalStorage = (item: string) => {
	if (typeof window === "undefined") return;
	const storedData = window.localStorage.getItem(item);
	if (storedData) {
		return JSON.parse(storedData);
	} else return {};
};

export const updateLocalOnlyData = (data: Record<string, string>) => {
	if (typeof window === "undefined") return;
	let localData = getLocalStorage("localOnly");
	localData = { ...localData, ...data };
	window.localStorage.setItem("localOnly", JSON.stringify(localData));
};

export const updateLocalSettings = (settings: Record<string, string>) => {
	if (typeof window === "undefined") return;
	let localData = getLocalStorage("herbivorous");
	if (!localData.settings) localData.settings = {};
	localData.settings = { ...localData.settings, ...settings };
	window.localStorage.setItem("herbivorous", JSON.stringify(localData));
};

export const updateLocalProgress = (
	dateString: string = getDateString(),
	goal: string,
	progress: number,
) => {
	if (typeof window === "undefined") return;
	let updatedData = getLocalStorage("herbivorous");
	if (!updatedData.progress) updatedData.progress = {};
	if (!updatedData.progress[dateString]) updatedData.progress[dateString] = {};
	updatedData.progress[dateString][goal] = progress;
	window.localStorage.setItem("herbivorous", JSON.stringify(updatedData));
};

export const clearLocalProgressForDate = (
	dateString: string = getDateString(),
) => {
	if (typeof window === "undefined") return;
	let updatedData = getLocalStorage("herbivorous");
	if (!updatedData.progress) updatedData.progress = {};
	updatedData.progress[dateString] = {};
	window.localStorage.setItem("herbivorous", JSON.stringify(updatedData));
};

export const resetLocalStorage = () => {
	if (typeof window === "undefined") return;
	window.localStorage.setItem("herbivorous", "");
	window.localStorage.setItem("localOnly", "");
};
