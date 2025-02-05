import Stepper from "@/components/Stepper";

const stepperData = [
  { label: "Custome info", value: "" },
  { label: "Shipping info", value: "" },
  { label: "Payment", value: "" },
  { label: "Delivered", value: "" },
];

const StepperPage = () => {
  /**
   * TSX
   */
  return (
    <div className="h-[40vh] flex justify-center items-center">
      <Stepper data={stepperData} />
    </div>
  );
};

export default StepperPage;
