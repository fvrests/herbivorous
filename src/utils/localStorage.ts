import { getDateString } from "@/utils/date";

export const getLocalStorage = async () => {
  const storedData = window.localStorage.getItem("herbivorous");
  if (storedData) {
    return JSON.parse(storedData);
  } else return null;
};

export const updateLocalSetting = (key: string, value: string) => {
  getLocalStorage().then((result) => {
    let updatedData = result;
    if (!updatedData.settings) updatedData.settings = {};
    updatedData.settings[key] = value;
    window.localStorage.setItem("herbivorous", JSON.stringify(updatedData));
  });
};

export const updateLocalProgress = (
  dateString: string = getDateString(),
  goal: string,
  progress: number,
) => {
  getLocalStorage().then((result) => {
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
};
