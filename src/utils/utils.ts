export const getDateString = (offsetOverride?: number) => {
  // todo: add feature to settings to allow offset override

  // date in UTC
  const today = new Date();

  // get offset in hours (default for method is minutes)
  const timezoneOffset = (-1 * today.getTimezoneOffset()) / 60;

  // update today's hours with override or local timezone offset
  today.setHours(
    today.getHours() + (offsetOverride ? offsetOverride : timezoneOffset),
  );

  return today.toJSON().split("T")[0];
};

export const getLocalStorage = async () => {
  const storedData = window.localStorage.getItem("herbivorous");
  if (storedData) {
    return JSON.parse(storedData);
  } else return null;
};

export const updateLocalSetting = (key: string, value: string) => {
  getLocalStorage().then((result) => {
    let updatedData = result;
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
    updatedData.progress[dateString][goal] = progress;
    window.localStorage.setItem("herbivorous", JSON.stringify(updatedData));
  });
};

export const resetLocalStorage = () => {
  window.localStorage.setItem("herbivorous", "");
};
