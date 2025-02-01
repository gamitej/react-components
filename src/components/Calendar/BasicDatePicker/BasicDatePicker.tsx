import { yearsOptions } from "./data";
// icons
import { IoCalendar as CalendarIcon } from "react-icons/io5";
import { IoIosArrowBack as ArrowIcon } from "react-icons/io";

interface BasicDatePickerProps {
  date?: string | null;
}

const BasicDatePicker = ({ date }: BasicDatePickerProps) => {
  console.log({ yearsOptions });
  /**
   * TSX
   */
  return (
    <div className="relative">
      <button className="rounded-sm cursor-pointer select-none bg-gray-100 px-4 py-2 w-[20rem] flex justify-between items-center focus:ring-2 focus:ring-blue-200">
        <span className="text-lg text-gray-700">{date ?? "dd/mm/yyyy "}</span>
        <span>
          <CalendarIcon className="text-2xl text-gray-600" />
        </span>
      </button>

      <div className="absolute w-full z-100 mt-2 bg-gray-50 rounded-sm shadow border">
        <DateCard />
      </div>
    </div>
  );
};

function DateCard() {
  return (
    <div>
      <div className="w-full grid grid-cols-12 text-gray-700 overflow-hidden border-b">
        <span className="rounded-sm col-span-3 flex justify-center items-center hover:bg-gray-200 cursor-pointer p-2 focus:ring-2 focus:ring-blue-200">
          <ArrowIcon className="text-2xl" />
        </span>
        <span className="border-x rounded-sm col-span-6 text-center text-lg hover:bg-gray-200 cursor-pointer p-2">
          Month
        </span>
        <span className="rounded-sm col-span-3 flex justify-center items-center hover:bg-gray-200 cursor-pointer p-2 focus:ring-2 focus:ring-blue-200">
          <ArrowIcon className="-rotate-180 text-2xl" />
        </span>
      </div>
      <div className="h-[10rem]"></div>
    </div>
  );
}

export default BasicDatePicker;
