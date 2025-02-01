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

export const weeks = [
  { no: 1, label: "Sunday" },
  { no: 2, label: "Monday" },
  { no: 3, label: "Tuseday" },
  { no: 4, label: "Wednesday" },
  { no: 5, label: "Thursday" },
  { no: 6, label: "Friday" },
  { no: 7, label: "Saturday" },
] as const;

export const monthsOptions = months.map((month: string, idx: number) => {
  return { month: idx + 1, shortLabel: month.slice(0, 3), fullLabel: month };
});

export const yearsOptions = Array.from({ length: 2099 - 1900 + 1 }).map(
  (_val, idx) => {
    return 1900 + idx;
  }
);
