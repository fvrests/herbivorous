export const getDate = (offsetOverride?: number) => {
  // todo: add feature to settings to allow offset override

  // date in UTC
  const today = new Date();

  // get offset in hours (default for method is minutes)
  const timezoneOffset = (-1 * today.getTimezoneOffset()) / 60;

  // update today's hours with override or local timezone offset
  today.setHours(
    today.getHours() + (offsetOverride ? offsetOverride : timezoneOffset),
  );

  // get date in YYYY-MM-DD
  const dateString = today.toJSON().split("T")[0];

  return dateString;
};
