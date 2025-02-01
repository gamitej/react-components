import { useMemo, useState } from "react";
// icons
import { IoCalendar as CalendarIcon } from "react-icons/io5";
import { IoIosArrowBack as ArrowIcon } from "react-icons/io";
// data
import { getTheDay, getTodaysDay, monthsOptions, weeks } from "./data";

interface BasicDatePickerProps {
  date?: string | null;
}

const BasicDatePicker = ({ date }: BasicDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleButton = () => setIsOpen((state) => !state);

  /**
   * TSX
   */
  return (
    <div className="relative">
      <button
        onClick={toggleButton}
        className="rounded-sm cursor-pointer select-none bg-gray-100 px-4 py-2 w-[15rem] flex justify-between items-center focus:ring-2 focus:ring-blue-200"
      >
        <span className="text-lg text-gray-700">{date ?? "dd/mm/yyyy "}</span>
        <span>
          <CalendarIcon className="text-2xl text-gray-600" />
        </span>
      </button>

      <div
        aria-hidden={!isOpen}
        className="aria-hidden:hidden absolute w-[20rem] z-100 mt-2 bg-gray-50 rounded-sm shadow border select-none"
      >
        <WeekAndDaysCardLayout />
      </div>
    </div>
  );
};

function WeekAndDaysCardLayout() {
  const [currentDate, setCurrentDate] = useState(() => getTodaysDay());

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

  const date = useMemo(() => {
    const dateInfo = monthsOptions.find(
      (item) => item.month === currentDate.month
    ) || { days: 0, shortName: "" };

    // get no of day in a month and starting week day
    const weekDay = getTheDay(currentDate) || { no: 1 };
    const emptyFillArray = Array(weekDay?.no - 1).fill(" ");
    for (let i = 0; i < dateInfo?.days; i++) emptyFillArray.push(i + 1);

    // const dateFormat = `${currentDate.year}/${currentDate.month}/${currentDate.date}`;

    return { ...dateInfo, day: weekDay, daysArray: emptyFillArray };
  }, [currentDate]);

  /**
   * TSX
   */
  return (
    <div>
      {/* ======================= SELECT OPTIONS ======================== */}
      <div className="w-full grid grid-cols-12 text-gray-700 overflow-hidden border-b">
        <span
          onClick={handlePrevMonth}
          className="rounded-sm col-span-3 flex justify-center items-center hover:bg-gray-200 cursor-pointer p-1 focus:ring-2 focus:ring-blue-200"
        >
          <ArrowIcon className="text-2xl" />
        </span>
        <span className="border-x rounded-sm col-span-6 text-center text-lg hover:bg-gray-200 cursor-pointer p-1">
          {date?.shortName} {currentDate.year}
        </span>
        <span
          onClick={handleNextMonth}
          className="rounded-sm col-span-3 flex justify-center items-center hover:bg-gray-200 cursor-pointer p-1 focus:ring-2 focus:ring-blue-200"
        >
          <ArrowIcon className="-rotate-180 text-2xl" />
        </span>
      </div>

      <div className="h-fit">
        {/* ======================= WEEKS ======================== */}
        <div className="grid grid-cols-7 border-b">
          {weeks.map(({ week }, idx) => (
            <span
              title={week}
              key={`${week}-${idx}`}
              className={`col-span-1 ${
                idx % 2 === 0 ? "bg-gray-100" : ""
              } text-center text-gray-600`}
            >
              {week.slice(0, 1)}
            </span>
          ))}
        </div>
        {/* ======================= DAYS ======================== */}
        <div className="grid grid-cols-7 border-b">
          {date.daysArray.map((val, idx) => (
            <span
              key={`${val}-${idx}`}
              className={`col-span-1 ${
                idx % 2 === 0 ? "bg-gray-100" : ""
              } text-center text-gray-600 hover:bg-blue-200`}
            >
              {val}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BasicDatePicker;
