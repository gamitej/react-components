import { useEffect, useRef, useState } from "react";

interface OtpInputProps {
  inputLength: number;
}

const OtpInput = ({ inputLength = 3 }: OtpInputProps) => {
  const [isOtpFilled, setIsOtpFilled] = useState<boolean>(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    Array(inputLength).fill(null)
  );
  const [inputs, setInputs] = useState<string[]>(Array(inputLength).fill(""));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const val = e.target.value.replace(/\D/g, ""); // only numbers
    if (!val) return;

    console.log({ val });

    const newInputs = [...inputs];

    if (val.length === inputLength) {
      // If full OTP is pasted, split it across inputs
      newInputs.splice(0, inputLength, ...val.split("").slice(0, inputLength));
      setInputs(newInputs);
      inputRefs.current[inputLength - 1]?.focus();
    } else {
      newInputs[idx] = val[val.length - 1];
      setInputs(newInputs);

      // Move focus to next input if available
      if (idx < inputLength - 1) {
        inputRefs.current[idx + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();

      const newInputs = [...inputs];

      if (newInputs[idx]) {
        // If the current input has a value, clear it
        newInputs[idx] = "";
      } else if (idx > 0) {
        // If empty, move focus to the previous input and clear it
        newInputs[idx - 1] = "";
        inputRefs.current[idx - 1]?.focus();
      }

      setInputs(newInputs);
    }
  };

  useEffect(() => {
    const isValid = inputs.every((input) => input.length > 0);

    setIsOtpFilled(isValid);
  }, [inputs]);

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <div className="flex justify-center items-center gap-4 mt-4">
        {inputs.map((value, idx) => (
          <input
            key={idx}
            type="text"
            // maxLength={1}
            value={value}
            ref={(el) => (inputRefs.current[idx] = el)}
            onChange={(e) => handleChange(e, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className="border-2 border-gray-400 w-10 h-10 text-center text-lg font-[550] text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>
      <button
        aria-disabled={!isOtpFilled}
        className="px-4 py-2 rounded-md shadow bg-blue-400 hover:bg-blue-500 text-white font-[550] aria-disabled:bg-gray-200 aria-disabled:cursor-not-allowed"
      >
        submit
      </button>
    </div>
  );
};

export default OtpInput;
