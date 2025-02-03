import { createContext, FC, ReactNode, useContext, useState } from "react";
import { DateType } from "../type";

interface DatePickerContextType {
  isOpen: boolean;
  handleClose: () => void;
  toggleDropdown: () => void;
  selectedDate: DateType | undefined;
  handleDateSelect: (date: DateType, isCalendarOpen: boolean) => void;
}

/**
 * =============== create context =================
 */
const DatePickerContext = createContext<DatePickerContextType | undefined>(
  undefined
);

/**
 * =================== provider =================
 */
export const DatePickerProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateType | undefined>(
    undefined
  );

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClose = () => setIsOpen(false);

  const handleDateSelect = (date: DateType, isCalendarOpen: boolean) => {
    setSelectedDate(date);
    setIsOpen(isCalendarOpen);
  };

  return (
    <DatePickerContext.Provider
      value={{
        isOpen,
        selectedDate,
        toggleDropdown,
        handleDateSelect,
        handleClose,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};

/**
 * ============= use context =================
 */
export const useDatePicker = () => {
  const context = useContext(DatePickerContext);
  if (!context)
    throw new Error("useDatePicker must be used within a DatePickerProvider");

  return context;
};
