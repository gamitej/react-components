import { useRef, useState } from "react";

interface OtpInputProps {
  inputLength: number;
}

const OtpInput = ({ inputLength = 3 }: OtpInputProps) => {
  const inputRefs = useRef<HTMLInputElement | []>([]);

  const [inputs, setInputs] = useState<any[]>(() => {
    return Array(inputLength).fill("");
  });

  const handleChange = (key: string, idx: number) => {
    const val = Number(key);

    if (!isNaN(val)) {
      setInputs((state) => {
        const newArr = [...state];
        newArr[idx] = val;
        return newArr;
      });

      if (idx < inputLength - 1) {
        inputRefs.current[idx + 1]?.focus();
      }
    } else if (key === "Backspace") {
      setInputs((state) => {
        const newArr = [...state];
        newArr[idx] = "";
        return newArr;
      });

      if (idx > 0) {
        inputRefs.current[idx - 1]?.focus();
      }
    }
  };

  /**
   * TSX
   */
  return (
    <div className="flex justify-center items-center gap-4">
      {inputs.map((value, idx) => (
        <input
          key={idx}
          type="text"
          maxLength={1}
          value={value}
          ref={(el) => (inputRefs.current[idx] = el)}
          onKeyDown={({ key }) => handleChange(key, idx)}
          className="border-2 border-gray-400 w-10 h-10 text-center text-lg font-[550] text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
  );
};

export default OtpInput;
