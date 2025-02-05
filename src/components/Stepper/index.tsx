import { ReactNode, useState } from "react";

interface StepperProps {
  width?: string;
  data: { name: string; component: () => string }[];
}

const Stepper = ({ data, width = "100%" }: StepperProps) => {
  const totalSteps = data.length;
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < totalSteps - 1) setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const progressBarWidth = Math.ceil((currentStep / (totalSteps - 1)) * 100);

  const SelectedStepperComponent = data[currentStep].component;

  if (data.length < 2) {
    console.error("Stepper data is too short!");
    return null;
  }

  return (
    <div style={{ width }} className="flex flex-col items-center gap-12 p-8">
      {/* Stepper Bar */}
      <div className="w-full relative flex flex-col items-center">
        {/* Progress Bar */}
        <div className="absolute top-6 w-[calc(100%-5rem)] h-2 bg-gray-300 rounded-lg">
          <div
            className="h-2 bg-blue-500 rounded-lg transition-all duration-300"
            style={{ width: `${progressBarWidth}%` }}
          ></div>
        </div>

        {/* Step Circles */}
        <div className="flex w-[calc(100%+.2rem)] justify-between items-center">
          {data.map(({ name }, idx) => (
            <div
              key={`${name}-${idx}`}
              className="flex flex-col justify-center items-center gap-4"
            >
              <div
                className={`w-14 h-14 z-10 flex items-center justify-center rounded-full text-lg font-semibold
                ${
                  idx <= currentStep
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-600"
                } transition-all duration-300`}
              >
                {currentStep > idx ? "d" : idx + 1}
              </div>
              <div>
                <span className="text-gray-600 font-[550] text-lg">{name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full">{SelectedStepperComponent()}</div>

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
