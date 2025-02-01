export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const monthsOptions = months.map((month: string, idx: number) => {
  return { monthNo: idx + 1, shortLabel: month.slice(0, 3), fullLabel: month };
});

export const yearsOptions = Array.from({ length: 2099 - 1900 + 1 }).map(
  (_val, idx) => {
    return 1900 + idx;
  }
);
