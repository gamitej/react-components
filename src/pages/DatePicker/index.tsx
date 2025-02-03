import BasicDatePicker from "@/components/Calendar/BasicDatePicker/BasicDatePicker";
// import { useState } from "react";

const DatePicker = () => {
  //   const [select, setSelect] = useState<OptionsType | null>(null);

  //   const handleDropdownChange = (option: OptionsType) => {
  //     setSelect(option);
  //   };

  /**
   * TSX
   */
  return (
    <div className="flex justify-center pt-36">
      <BasicDatePicker />
    </div>
  );
};

export default DatePicker;
