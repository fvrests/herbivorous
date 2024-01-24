import { getDateString } from "@/utils/date";

export const getLocalStorage = async (item: string) => {
  const storedData = window.localStorage.getItem(item);
  if (storedData) {
    return JSON.parse(storedData);
  } else return null;
};

export const updateLocalOnlyData = (data: Record<string, string>) => {
  getLocalStorage("localOnly").then((result) => {
    let localData = result;
    localData = { ...localData, ...data };
    window.localStorage.setItem("localOnly", JSON.stringify(localData));
  });
};

export const updateLocalSettings = (settings: Record<string, string>) => {
  getLocalStorage("herbivorous").then((result) => {
    let localData = result;
    if (!localData.settings) localData.settings = {};
    localData.settings = { ...localData.settings, ...settings };
    window.localStorage.setItem("herbivorous", JSON.stringify(localData));
  });
};

export const updateLocalProgress = (
  dateString: string = getDateString(),
  goal: string,
  progress: number,
) => {
  getLocalStorage("herbivorous").then((result) => {
    let updatedData = result;
    if (!updatedData.progress) updatedData.progress = {};
    if (!updatedData.progress[dateString])
      updatedData.progress[dateString] = {};
    updatedData.progress[dateString][goal] = progress;
    window.localStorage.setItem("herbivorous", JSON.stringify(updatedData));
  });
};

export const resetLocalStorage = () => {
  window.localStorage.setItem("herbivorous", "");
  window.localStorage.setItem("localOnly", "");
};
