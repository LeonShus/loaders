export const changeDate = (date: string) => {
  return date.split(" ")[0].split(".").reverse().join("-");
};
