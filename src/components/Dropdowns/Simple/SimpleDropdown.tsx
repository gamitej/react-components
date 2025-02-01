import { OptionsType } from "@/type/type";
import { useEffect, useMemo, useRef, useState } from "react";
import { IoIosArrowDown as DownIcon } from "react-icons/io";

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
  const divRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node))
        setIsOpen(false);
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  /**
   * ============================ EVENT HANDLERS ============================
   */

  const toggledButton = () => {
    setIsOpen((state) => !state);
  };

  //
  const selectedOption = useMemo(() => {
    if (!selectedValue) return null;

    return options.find((option) => option.value === selectedValue.value);
  }, [selectedValue, options]);

  const handleSelectOption = (option: T) => {
    onSelect(option);
    setIsOpen(false);
  };

  /**
   * TSX
   */
  return (
    <div ref={divRef} className="relative select-none">
      <button
        onClick={toggledButton}
        className="bg-gray-100/80 px-4 py-2 rounded-sm text-xl flex justify-between items-center gap-4 w-[20rem] focus:ring-2 focus:ring-blue-300 text-gray-700"
      >
        <span>{selectedOption?.label ?? "select..."}</span>
        <span>
          <DownIcon className={`${!isOpen ? "-rotate-90" : ""}`} />
        </span>
      </button>

      <div
        aria-hidden={!isOpen}
        className="w-full absolute z-100 bg-gray-50 aria-hidden:hidden flex flex-col shadow rounded-sm mt-2 overflow-hidden border border-gray-200"
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
