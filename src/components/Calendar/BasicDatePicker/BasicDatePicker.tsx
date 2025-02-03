// components
import WeekAndDaysGridLayout from "./components/WeekAndDaysGridLayout";
// icons
import { IoCalendar as CalendarIcon } from "react-icons/io5";
// hooks
import { useClickOutside } from "@/hooks/useClickOutside";
// type
import { BasicDatePickerProps } from "./type";
import { useDatePicker } from "./context/DatePickerContext";

const BasicDatePicker = ({ date }: BasicDatePickerProps) => {
  const { isOpen, selectedDate, toggleDropdown } = useDatePicker();

  const divRef = useClickOutside<HTMLDivElement>(() => toggleDropdown());

  /**
   * EVENT HANDLERS
   */

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
        onClick={toggleDropdown}
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
        <WeekAndDaysGridLayout />
      </div>
    </div>
  );
};

export default BasicDatePicker;
