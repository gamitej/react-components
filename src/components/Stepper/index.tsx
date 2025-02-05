import { useState } from "react";

interface StepperProps {
  data: { label: string; value: string }[];
}

const Stepper = ({ data }: StepperProps) => {
  const totalSteps = data.length;
  const width = 10 * totalSteps;
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < totalSteps - 1) setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  if (data.length < 2) {
    console.error("Stepper data is too short!");
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-12 p-8">
      {/* Stepper Bar */}
      <div
        className="relative flex flex-col items-center"
        style={{ width: `${width}rem` }}
      >
        {/* Progress Bar */}
        <div className="absolute top-6 w-full h-2 bg-gray-300 rounded-lg">
          <div
            className="h-2 bg-blue-500 rounded-lg transition-all duration-300"
            style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
          ></div>
        </div>

        {/* Step Circles */}
        <div className="relative flex w-[calc(100%+.2rem)] justify-between items-center">
          {data.map((_, idx) => (
            <div
              key={idx}
              className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-semibold
                ${
                  idx <= currentStep
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-600"
                } transition-all duration-300`}
            >
              {idx + 1}
            </div>
          ))}
        </div>

        {/* Step Labels */}
        <div
          className="grid mt-4"
          style={{
            width: `${width + 10}rem`,
            gridTemplateColumns: `repeat(${totalSteps}, 1fr)`,
          }}
        >
          {data.map(({ label }, idx) => (
            <span
              key={idx}
              className={`text-lg text-center font-medium transition-all duration-300
                ${idx === currentStep ? "text-blue-600" : "text-gray-500"}`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-6">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="px-6 py-2 rounded-md shadow text-white text-lg 
            disabled:bg-gray-400 disabled:cursor-not-allowed bg-gray-700 hover:bg-gray-800 transition-all"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === totalSteps - 1}
          className="px-6 py-2 rounded-md shadow text-white text-lg 
            disabled:bg-gray-400 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 transition-all"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Stepper;
