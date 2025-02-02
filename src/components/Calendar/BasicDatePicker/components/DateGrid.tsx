import { compareDates, isGreaterThanCurrentDate, isTodaysDay } from "../data";
import { DateGridProps } from "../type";

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

export default DateGrid;
