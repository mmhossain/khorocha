export const getCurrentMonthLabel = () => {
  const now = new Date();
  return now.toLocaleString("default", { month: "long", year: "numeric" });
};
