import Stepper from "@/components/Stepper";

const stepperData = [
  { name: "Custome info", component: () => "please enter your personal info" },
  { name: "Shipping info", component: () => "please shipping address daata" },
  { name: "Payment", component: () => "please enter payment details" },
  { name: "Delivered", component: () => "Item Delivered" },
];

const StepperPage = () => {
  /**
   * TSX
   */
  return (
    <div className="h-[40vh] flex justify-center items-center">
      <Stepper data={stepperData} width="80%" />
    </div>
  );
};

export default StepperPage;
