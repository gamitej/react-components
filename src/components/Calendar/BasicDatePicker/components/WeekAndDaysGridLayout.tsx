import { useEffect, useMemo, useState } from "react";
// components
import DateGrid from "./DateGrid";
// data & types
import { weeks, yearsOptions, monthsOptions } from "../data";
import { DateType, WeekAndDaysGridLayoutProps } from "../type";
// icons
import { IoIosArrowBack as ArrowIcon } from "react-icons/io";
import DateUtils from "@/utils/DateUtlis";

const { getToday, getWeekDay, isLeapYear } = DateUtils;

function WeekAndDaysGridLayout({
  selectedDate,
  onDateSelect,
}: WeekAndDaysGridLayoutProps) {
  const [isShowYear, setIsShowYear] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<DateType>(() => getToday());

  /**
   *  USE EFFECT
   *  for setting the current date when user clicks on the calendar date pick
   */

  useEffect(() => {
    if (selectedDate) setCurrentDate(selectedDate);
  }, [selectedDate]);

  /**
   *  EVENT HANDLERS
   */

  const handleYearSelect = () => setIsShowYear((state) => !state);

  // Function to handle month navigation
  const changeMonth = (increment: number) => {
    setCurrentDate((prev) => {
      const newMonth = prev.month + increment;
      return {
        ...prev,
        month: newMonth > 12 ? 1 : newMonth < 1 ? 12 : newMonth,
        year:
          newMonth > 12
            ? prev.year + 1
            : newMonth < 1
            ? prev.year - 1
            : prev.year,
      };
    });
  };

  // Compute the month's information and corresponding days array
  const dateInfo = useMemo(() => {
    const monthData = monthsOptions.find(
      (m) => m.month === currentDate.month
    ) || {
      days: 0,
      shortName: "",
      month: 0,
    };

    // Get the first weekday of the month
    const weekDay = getWeekDay(currentDate) || { no: 1 };

    // Determine the total days in the month (handling February for leap years)
    const totalDays =
      monthData.month === 2
        ? isLeapYear(currentDate.year)
          ? 29
          : 28
        : monthData.days;

    // Create an array representing the calendar grid with leading empty spaces
    const daysArray = [
      ...Array(weekDay.no - 1).fill(" "),
      ...Array(totalDays).keys(),
    ].map((d) => d + 1);

    return { ...monthData, daysArray };
  }, [currentDate]);

  /**
   * TSX
   */
  return (
    <div>
      {/* Month & Year Selection */}
      <div className="w-full grid grid-cols-12 text-gray-600 overflow-hidden border-b">
        <span
          onClick={() => changeMonth(-1)}
          aria-selected={isShowYear} // when year is selected hide this
          className="rounded-sm col-span-3 aria-selected:hidden flex justify-center items-center hover:bg-gray-100 cursor-pointer p-2 focus:ring-2 focus:ring-blue-200"
        >
          <ArrowIcon className="text-xl" />
        </span>
        <span
          onClick={handleYearSelect}
          aria-selected={isShowYear}
          className="border-x rounded-sm col-span-6 aria-selected:col-span-12 text-center text-lg hover:bg-gray-100 cursor-pointer p-2 uppercase"
        >
          {dateInfo?.shortName} {currentDate.year}
        </span>
        <span
          onClick={() => changeMonth(1)}
          aria-selected={isShowYear} // when year is selected hide this
          className="rounded-sm col-span-3 aria-selected:hidden flex justify-center items-center hover:bg-gray-100 cursor-pointer p-2 focus:ring-2 focus:ring-blue-200"
        >
          <ArrowIcon className="-rotate-180 text-xl" />
        </span>
      </div>

      {isShowYear && (
        <div className="h-[15rem] px-2 py-1 overflow-y-auto">
          <div className="w-full grid grid-cols-12">
            {yearsOptions.map((year) => (
              <span
                key={year}
                aria-selected={
                  selectedDate?.year ? selectedDate?.year === year : false
                }
                onClick={() => onDateSelect({ date: 1, month: 1, year })}
                className="p-2 col-span-3 text-center text-gray-600 cursor-pointer hover:bg-gray-100 aria-selected:bg-red-300"
              >
                {year}
              </span>
            ))}
          </div>
        </div>
      )}

      {!isShowYear && (
        <div className="h-[21rem] p-3">
          {/* Week Days Header */}
          <div className="grid grid-cols-7 gap-4 py-2">
            {weeks.map(({ week }, idx) => (
              <span
                title={week}
                key={`${week}-${idx}`}
                className={`col-span-1 text-center text-gray-400`}
              >
                {week.slice(0, 1)}
              </span>
            ))}
          </div>
          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-4">
            {dateInfo.daysArray.map((date, idx) => (
              <DateGrid
                date={date}
                key={`${date}-${idx}`}
                currentDate={currentDate}
                onDateSelect={onDateSelect}
                selectedDate={selectedDate}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WeekAndDaysGridLayout;
