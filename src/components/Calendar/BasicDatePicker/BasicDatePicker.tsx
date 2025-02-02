import { useEffect, useMemo, useState } from "react";
// icons
import { IoCalendar as CalendarIcon } from "react-icons/io5";
import { IoIosArrowBack as ArrowIcon } from "react-icons/io";
// data
import {
  weeks,
  DateType,
  getTheWeekDay,
  isTodaysDay,
  compareDates,
  getTodaysDay,
  monthsOptions,
  checkLeapYear,
  isGreaterThanCurrentDate,
  yearsOptions,
} from "./data";
import { useClickOutside } from "@/hooks/useClickOutside";

interface BasicDatePickerProps {
  date?: string | undefined;
}

interface WeekAndDaysGridLayoutProps {
  selectedDate: DateType | undefined;
  onDateSelect: (val: DateType) => void;
}

interface DateGridProps extends WeekAndDaysGridLayoutProps {
  currentDate: DateType;
  date: number | string;
}

const BasicDatePicker = ({ date }: BasicDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateType | undefined>(
    undefined
  );

  const divRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const toggleButton = () => setIsOpen((state) => !state);

  const handleDateSelect = (date: DateType) => {
    setSelectedDate(date);
    setIsOpen(false);
  };

  const showDate = selectedDate
    ? `${selectedDate?.date}/${selectedDate?.month}/${selectedDate?.year}`
    : undefined;

  /**
   * TSX
   */
  return (
    <div ref={divRef} className="relative">
      <button
        aria-selected={isOpen}
        onClick={toggleButton}
        className="rounded-sm cursor-pointer select-none bg-gray-100 px-4 py-2 w-[15rem] flex justify-between items-center aria-selected:ring-2 peer-aria-selected:ring-blue-200"
      >
        <span className="text-lg text-gray-700">
          {showDate ?? "dd/mm/yyyy"}
        </span>
        <span>
          <CalendarIcon className="text-2xl text-gray-600" />
        </span>
      </button>

      <div
        aria-hidden={!isOpen}
        className="aria-hidden:hidden absolute w-[25rem] z-100 mt-1 bg-white shadow-md rounded-sm border select-none"
      >
        <WeekAndDaysGridLayout
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />
      </div>
    </div>
  );
};

function WeekAndDaysGridLayout({
  selectedDate,
  onDateSelect,
}: WeekAndDaysGridLayoutProps) {
  const [isShowYear, setIsShowYear] = useState<boolean>(false);

  const [currentDate, setCurrentDate] = useState(() => getTodaysDay());

  const onYearSelect = () => {
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

  useEffect(() => {
    if (selectedDate) setCurrentDate(selectedDate);
  }, [selectedDate]);

  const date = useMemo(() => {
    const dateInfo = monthsOptions.find(
      (item) => item.month === currentDate.month
    ) || { days: 0, shortName: "", month: 0 };

    // get no of day in a month and starting week day
    const weekDay = getTheWeekDay(currentDate) || { no: 1 };
    const emptyFillArray = Array(weekDay?.no - 1).fill(" ");
    const noOfDay =
      dateInfo.month === 2
        ? checkLeapYear(currentDate.year)
          ? 29
          : 28
        : dateInfo.days;
    for (let i = 0; i < noOfDay; i++) emptyFillArray.push(i + 1);

    return { ...dateInfo, day: weekDay, daysArray: emptyFillArray };
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
          onClick={onYearSelect}
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

function DateGrid({
  date,
  currentDate,
  onDateSelect,
  selectedDate,
}: DateGridProps) {
  if (typeof date === "string") return <span className="col-span-1 p-1"></span>;

  const isTodayDate = isTodaysDay({ ...currentDate, date });
  const isGreater = isGreaterThanCurrentDate({ ...currentDate, date });

  const isSelected = selectedDate
    ? compareDates({
        date1: selectedDate,
        date2: { ...currentDate, date },
      })
    : false;

  /**
   * TSX
   */
  return (
    <span
      aria-selected={isSelected}
      onClick={() => onDateSelect({ ...currentDate, date })}
      className={`col-span-1 text-center text-gray-600 hover:bg-gray-100 cursor-pointer p-1 rounded-full ${
        isTodayDate ? "border-2 border-blue-300" : ""
      } ${isGreater && "text-gray-400"} aria-selected:bg-red-200`}
    >
      {date}
    </span>
  );
}

export default BasicDatePicker;
