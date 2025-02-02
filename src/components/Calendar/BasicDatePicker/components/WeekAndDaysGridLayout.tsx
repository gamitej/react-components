import { useEffect, useMemo, useState } from "react";
// components
import DateGrid from "./DateGrid";
// data & types
import {
  weeks,
  yearsOptions,
  checkLeapYear,
  getTheWeekDay,
  getTodaysDay,
  monthsOptions,
} from "../data";
import { DateType, WeekAndDaysGridLayoutProps } from "../type";
// icons
import { IoIosArrowBack as ArrowIcon } from "react-icons/io";

function WeekAndDaysGridLayout({
  selectedDate,
  onDateSelect,
}: WeekAndDaysGridLayoutProps) {
  const [isShowYear, setIsShowYear] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<DateType>(() =>
    getTodaysDay()
  );

  /**
   *  ============================ USE EFFECT ==============================
   *  for setting the current date when user clicks on the calendar date pick
   */

  useEffect(() => {
    if (selectedDate) setCurrentDate(selectedDate);
  }, [selectedDate]);

  /**
   *  ============================ EVENT HANDLERS ===========================
   */

  const handleYearSelect = () => {
    setIsShowYear((state) => !state);
  };

  const handleNextMonth = () => {
    if (currentDate.month === 12)
      setCurrentDate((state) => ({ ...state, month: 1, year: state.year + 1 }));
    else setCurrentDate((state) => ({ ...state, month: state.month + 1 }));
  };

  const handlePrevMonth = () => {
    if (currentDate.month === 1) {
      setCurrentDate((state) => ({
        ...state,
        month: 12,
        year: state.year - 1,
      }));
    } else setCurrentDate((state) => ({ ...state, month: state.month - 1 }));
  };

  /**
   *  ============================ USE MEMO ===========================
   *  for
   */

  const date = useMemo(() => {
    // find the matched month
    const matchedDateInfo = monthsOptions.find(
      (item) => item.month === currentDate.month
    ) || { days: 0, shortName: "", month: 0 };

    // get no of day in a month & starting month day week-name
    const weekDay = getTheWeekDay(currentDate) || { no: 1 };
    const emptyFillArray = Array(weekDay?.no - 1).fill(" ");
    const noOfDay =
      matchedDateInfo.month === 2
        ? checkLeapYear(currentDate.year)
          ? 29
          : 28
        : matchedDateInfo.days;
    for (let i = 0; i < noOfDay; i++) emptyFillArray.push(i + 1);

    return { ...matchedDateInfo, day: weekDay, daysArray: emptyFillArray };
  }, [currentDate]);

  /**
   * TSX
   */
  return (
    <div>
      {/* ======================= SELECT OPTIONS ======================== */}
      <div className="w-full grid grid-cols-12 text-gray-600 overflow-hidden border-b">
        <span
          onClick={handlePrevMonth}
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
          {date?.shortName} {currentDate.year}
        </span>
        <span
          onClick={handleNextMonth}
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
          {/* ======================= WEEKS ======================== */}
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
          {/* ======================= DAYS ======================== */}
          <div className="grid grid-cols-7 gap-4">
            {date.daysArray.map((date, idx) => (
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
