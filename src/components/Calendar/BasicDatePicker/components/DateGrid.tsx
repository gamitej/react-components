import { DateGridProps } from "../type";
import DateUtils from "@/utils/DateUtlis";
// context
import { useDatePicker } from "../context/DatePickerContext";

const { isToday, areDatesEqual, isFutureDate } = DateUtils;

function DateGrid({ date, currentDate }: DateGridProps) {
  const { selectedDate, handleDateSelect } = useDatePicker();

  if (typeof date === "string") return <span className="col-span-1 p-1"></span>;

  const isTodayDate = isToday({ ...currentDate, date });
  const isGreater = isFutureDate({ ...currentDate, date });

  const isSelected = selectedDate
    ? areDatesEqual(selectedDate, { ...currentDate, date })
    : false;

  /**
   * TSX
   */
  return (
    <span
      aria-selected={isSelected}
      onClick={() => handleDateSelect({ ...currentDate, date })}
      className={`col-span-1 text-center text-gray-600 hover:bg-gray-100 cursor-pointer p-1 rounded-full ${
        isTodayDate ? "border-2 border-blue-300" : ""
      } ${isGreater && "text-gray-300"} aria-selected:bg-red-200`}
    >
      {date}
    </span>
  );
}

export default DateGrid;
