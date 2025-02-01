import { monthsOptions, weeks, yearsOptions } from "./data";
// icons
import { IoCalendar as CalendarIcon } from "react-icons/io5";
import { IoIosArrowBack as ArrowIcon } from "react-icons/io";
import { useMemo, useState } from "react";

interface BasicDatePickerProps {
  date?: string | null;
}

const BasicDatePicker = ({ date }: BasicDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleButton = () => setIsOpen((state) => !state);

  //   console.log({ yearsOptions });
  /**
   * TSX
   */
  return (
    <div className="relative">
      <button
        onClick={toggleButton}
        className="rounded-sm cursor-pointer select-none bg-gray-100 px-4 py-2 w-[20rem] flex justify-between items-center focus:ring-2 focus:ring-blue-200"
      >
        <span className="text-lg text-gray-700">{date ?? "dd/mm/yyyy "}</span>
        <span>
          <CalendarIcon className="text-2xl text-gray-600" />
        </span>
      </button>

      <div
        aria-hidden={!isOpen}
        className="aria-hidden:hidden absolute w-full z-100 mt-2 bg-gray-50 rounded-sm shadow border select-none"
      >
        <DateCard />
      </div>
    </div>
  );
};

function DateCard() {
  const [currentDate, setCurrentDate] = useState(() => {
    const date = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    return { date, month, year };
  });

  const date = useMemo(() => {
    return monthsOptions.find((item) => item.month === currentDate.month);
  }, [currentDate]);

  const handleMonthNext = () => {
    if (currentDate.month === 12) {
      setCurrentDate((state) => ({ ...state, month: 1, year: state.year + 1 }));
    } else {
      setCurrentDate((state) => ({ ...state, month: state.month + 1 }));
    }
  };

  const handleMonthPrev = () => {
    if (currentDate.month === 1) {
      setCurrentDate((state) => ({
        ...state,
        month: 12,
        year: state.year - 1,
      }));
    } else {
      setCurrentDate((state) => ({ ...state, month: state.month - 1 }));
    }
  };

  /**
   * TSX
   */
  return (
    <div>
      <div className="w-full grid grid-cols-12 text-gray-700 overflow-hidden border-b">
        <span
          onClick={handleMonthPrev}
          className="rounded-sm col-span-3 flex justify-center items-center hover:bg-gray-200 cursor-pointer p-1 focus:ring-2 focus:ring-blue-200"
        >
          <ArrowIcon className="text-2xl" />
        </span>
        <span className="border-x rounded-sm col-span-6 text-center text-lg hover:bg-gray-200 cursor-pointer p-1">
          {date?.shortLabel} - {currentDate.year}
        </span>
        <span
          onClick={handleMonthNext}
          className="rounded-sm col-span-3 flex justify-center items-center hover:bg-gray-200 cursor-pointer p-1 focus:ring-2 focus:ring-blue-200"
        >
          <ArrowIcon className="-rotate-180 text-2xl" />
        </span>
      </div>
      <div className="h-[10rem]">
        <div className="grid grid-cols-7 border-b">
          {weeks.map(({ label }, idx) => (
            <span
              title={label}
              key={`${label}-${idx}`}
              className={`col-span-1 ${
                idx % 2 === 0 ? "bg-gray-100" : ""
              } text-center`}
            >
              {label.slice(0, 1)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BasicDatePicker;
