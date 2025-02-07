import { useRef, useState } from "react";

interface OtpInputProps {
  inputLength: number;
}

const OtpInput = ({ inputLength = 3 }: OtpInputProps) => {
  const inputRefs = useRef<HTMLInputElement | []>([]);

  const [inputs, setInputs] = useState<number[]>(() => {
    return Array(inputLength).fill("");
  });

  const handleChange = (val: number, idx: number) => {
    inputs[idx] = val;
    setInputs([...inputs]);
  };

  /**
   * TSX
   */
  return (
    <div className="flex justify-center items-center gap-4">
      {inputs.map((value, idx) => (
        <input
          //   ref={(el) => {

          //   }}
          key={idx}
          type="text"
          placeholder=""
          value={value}
          onChange={({ target }) => handleChange(target.value, idx)}
          className="border-2 border-gray-400 w-6 h-6 p-4 text-gray-600"
        />
      ))}
    </div>
  );
};

export default OtpInput;
