import { useMemo, useState } from "react";
// hooks
import { useClickOutside } from "@/hooks/useClickOutside";
import { IoIosArrowDown as DownIcon } from "react-icons/io";
import { OptionsType } from "@/type/type";

interface SimpleDropdownProps<T> {
  options: T[];
  selectedValue: T | null;
  onSelect: (val: T) => void;
}

const SimpleDropdown = <T extends OptionsType>({
  onSelect,
  options = [],
  selectedValue,
}: SimpleDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const divRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  /**
   *  EVENT HANDLERS
   */

  const toggledButton = () => {
    setIsOpen((state) => !state);
  };

  const handleSelectOption = (option: T) => {
    onSelect(option);
    setIsOpen(false);
  };

  // get the selected option label & value
  const selectedOption = useMemo(() => {
    if (!selectedValue) return null;

    return options.find((option) => option.value === selectedValue.value);
  }, [selectedValue, options]);

  /**
   * TSX
   */
  return (
    <div ref={divRef} className="relative select-none">
      <button
        onClick={toggledButton}
        className="px-4 py-2 border rounded-md text-xl flex justify-between items-center gap-4 w-[20rem] focus:ring-2 focus:ring-blue-300 text-gray-700"
      >
        <span>{selectedOption?.label ?? "select option..."}</span>
        <span>
          <DownIcon className={`${!isOpen ? "-rotate-90" : ""}`} />
        </span>
      </button>

      <div
        aria-hidden={!isOpen}
        className="w-full absolute z-100 aria-hidden:hidden flex flex-col shadow rounded-md mt-2 overflow-hidden border"
      >
        {options.map((option) => (
          <span
            key={option.value}
            onClick={() => handleSelectOption(option)}
            aria-selected={selectedOption?.value === option.value}
            className={`px-4 py-2 hover:bg-blue-50 aria-selected:border-l-4 aria-selected:border-l-blue-300 aria-selected:bg-blue-50 not-last:border-b border-gray-200 text-gray-700`}
          >
            {option.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SimpleDropdown;
