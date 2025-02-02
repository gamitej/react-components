import { weeks } from "@/components/Calendar/BasicDatePicker/data";
import { DateType } from "@/components/Calendar/BasicDatePicker/type";

class DateUtils {
  /**
   * Gets today's date as an object.
   * @returns An object with today's date, month, and year.
   */
  static getToday(): DateType {
    const now = new Date();
    return {
      date: now.getDate(),
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    };
  }

  /**
   * Checks if a given year is a leap year.
   * @param year - The year to check.
   * @returns True if the year is a leap year, otherwise false.
   */
  static isLeapYear(year: number): boolean {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  /**
   * Gets the weekday of the first day of the given month and year.
   * @param currentDate - An object containing year and month.
   * @returns The corresponding weekday number and name.
   */
  static getWeekDay<T extends { year: number; month: number }>(
    currentDate: T
  ): { no: number; week: string } | undefined {
    const date = new Date(currentDate.year, currentDate.month - 1, 1);
    return weeks.find((w) => w.no === date.getDay() + 1);
  }

  /**
   * Checks if the given date matches today's date.
   * @param givenDate - The date to compare.
   * @returns True if the given date is today, otherwise false.
   */
  static isToday(givenDate: DateType): boolean {
    const today = DateUtils.getToday();
    return (
      givenDate.year === today.year &&
      givenDate.month === today.month &&
      givenDate.date === today.date
    );
  }

  /**
   * Checks if the given date is in the future compared to today.
   * @param givenDate - The date to compare.
   * @returns True if the given date is in the future, otherwise false.
   */
  static isFutureDate(givenDate: DateType): boolean {
    const today = DateUtils.getToday();
    const given = new Date(givenDate.year, givenDate.month - 1, givenDate.date);
    return (
      given.getTime() >
      new Date(today.year, today.month - 1, today.date).getTime()
    );
  }

  /**
   * Compares two dates for equality.
   * @param date1 - The first date.
   * @param date2 - The second date.
   * @returns True if the dates are equal, otherwise false.
   */
  static areDatesEqual(date1: DateType, date2: DateType): boolean {
    return (
      new Date(date1.year, date1.month - 1, date1.date).getTime() ===
      new Date(date2.year, date2.month - 1, date2.date).getTime()
    );
  }
}

export default DateUtils;
