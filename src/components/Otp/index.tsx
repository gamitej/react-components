import OtpInput from "./OtpInput";

const Otp = () => {
  /**
   * TSX
   */
  return (
    <div className="flex justify-center items-center pt-20">
      <div className="bg-white shadow rounded-md px-10 py-6">
        <OtpInput inputLength={6} />
      </div>
    </div>
  );
};

export default Otp;
