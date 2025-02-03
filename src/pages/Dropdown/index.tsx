import SimpleDropdown from "@/components/Dropdowns/Simple/SimpleDropdown";
import { OptionsType } from "@/type/type";
import { useState } from "react";

const options: OptionsType[] = [
  { label: "Indore", value: "indore" },
  { label: "Bhopal", value: "bhopal" },
  { label: "Delhi", value: "delhi" },
];

const Dropdown = () => {
  const [select, setSelect] = useState<OptionsType | null>(null);

  const handleDropdownChange = (option: OptionsType) => {
    setSelect(option);
  };

  /**
   * TSX
   */
  return (
    <div className="flex justify-center pt-36">
      <SimpleDropdown
        options={options}
        selectedValue={select}
        onSelect={handleDropdownChange}
      />
    </div>
  );
};

export default Dropdown;
