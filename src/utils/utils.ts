export const getDate = () => {
  // fix: use local timezone not UTC
  // note: maybe add feature to allow shift of time window (for users with reverse schedule e.g.)
  const epochDate = new Date();
  const timezoneOffset = epochDate.getTimezoneOffset() / 60;
  console.log("timezone offset", timezoneOffset);
  const today = epochDate.toISOString().split("T")[0];
  return today;
};
