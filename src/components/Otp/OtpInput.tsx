import { useRef, useState } from "react";

interface OtpInputProps {
  inputLength: number;
}

const OtpInput = ({ inputLength = 3 }: OtpInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    Array(inputLength).fill(null)
  );
  const [inputs, setInputs] = useState<string[]>(Array(inputLength).fill(""));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const val = e.target.value.replace(/\D/g, ""); // Allow only numbers
    if (!val) return;

    const newInputs = [...inputs];

    if (val.length === inputLength) {
      // If full OTP is pasted, split it across inputs
      newInputs.splice(0, inputLength, ...val.split("").slice(0, inputLength));
      setInputs(newInputs);
      inputRefs.current[inputLength - 1]?.focus();
    } else {
      // Otherwise, handle single character input
      newInputs[idx] = val[val.length - 1];
      setInputs(newInputs);

      // Move focus to next input if available
      if (idx < inputLength - 1) {
        inputRefs.current[idx + 1]?.focus();
      }
    }
  };

  return (
    <div className="flex justify-center items-center gap-4">
      {inputs.map((value, idx) => (
        <input
          key={idx}
          type="text"
          // maxLength={inputLength} // Allows pasting entire OTP
          value={value}
          ref={(el) => (inputRefs.current[idx] = el)}
          onChange={(e) => handleChange(e, idx)}
          className="border-2 border-gray-400 w-10 h-10 text-center text-lg font-[550] text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
  );
};

export default OtpInput;
