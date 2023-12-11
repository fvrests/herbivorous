export const getDate = () => {
  const epochDate = new Date();
  const today = epochDate.toISOString().split("T")[0];
  return today;
};
