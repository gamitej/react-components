export const months = [
  { month: "January", days: 31 },
  { month: "February", days: 28 }, // 29 in leap years
  { month: "March", days: 31 },
  { month: "April", days: 30 },
  { month: "May", days: 31 },
  { month: "June", days: 30 },
  { month: "July", days: 31 },
  { month: "August", days: 31 },
  { month: "September", days: 30 },
  { month: "October", days: 31 },
  { month: "November", days: 30 },
  { month: "December", days: 31 },
] as const;

export const weeks = [
  { no: 1, week: "Sunday" },
  { no: 2, week: "Monday" },
  { no: 3, week: "Tuseday" },
  { no: 4, week: "Wednesday" },
  { no: 5, week: "Thursday" },
  { no: 6, week: "Friday" },
  { no: 7, week: "Saturday" },
] as const;

export const monthsOptions = months.map(({ month, days }, idx: number) => {
  return {
    days,
    month: idx + 1,
    fullName: month,
    shortName: month.slice(0, 3),
  };
});

export const yearsOptions = Array.from({ length: 2099 - 1900 + 1 }).map(
  (_val, idx) => {
    return 1900 + idx;
  }
);

export const checkLeapYear = (year: number): boolean => {
  const days =
    year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;

  return days === 29;
};

/**
 * ==================== GET THE DAY ======================
 */

export const getTheDay = <T extends { year: number; month: number }>(
  currentDate: T
): { no: number; week: string } | undefined => {
  const dateFormat = `${currentDate.year}/${currentDate.month}/1`;
  const day = new Date(dateFormat).getDay();
  const weekDay = weeks.find((w) => w.no === day + 1);

  return weekDay;
};

export const getTodaysDay = () => {
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  return { date, month, year };
};
