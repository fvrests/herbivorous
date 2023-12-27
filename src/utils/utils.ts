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
  console.log("stored", storedData);
  if (storedData) {
    return JSON.parse(storedData);
  } else return null;
};

// fix: needs to update, not overwrite
export const updateLocalStorage = (newdata: UserData) => {
  getLocalStorage().then((result) => {
    let mergedData = result ? { ...result, ...newdata } : newdata;
    window.localStorage.setItem("herbivorous", JSON.stringify(mergedData));
  });
};

export const resetLocalStorage = () => {
  window.localStorage.setItem("herbivorous", "");
};
