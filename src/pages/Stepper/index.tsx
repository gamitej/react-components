import Stepper from "@/components/Stepper";

function PersonalInfo() {
  return <div>Please enter your personal info</div>;
}

function AddressInfo() {
  return <div>Please enter address info</div>;
}

function PaymentInfo() {
  return <div>Please enter payment info</div>;
}
function DeliveredInfo() {
  return <div>Delivered</div>;
}

const stepperData = [
  { name: "Custome info", component: PersonalInfo },
  { name: "Shipping info", component: AddressInfo() },
  { name: "Payment", component: PaymentInfo },
  { name: "Delivered", component: DeliveredInfo },
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
