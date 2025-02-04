import useToast from "@/components/Toast/ContextApproach/useToast";

const Toast = () => {
  const { triggerToast } = useToast();

  /**
   * TSX
   */
  return (
    <div className="flex justify-center pt-36">
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <div className="flex justify-center items-center gap-4">
          {/* <button
            onClick={() =>
              triggerToast("top-center", {
                type: "success",
                position: "top-center",
                message: "File successfully downloaded",
              })
            }
            className="bg-green-400 w-[10rem] py-3 rounded-md shadow text-white font-[550]"
          >
            Click Success !
          </button> */}
          <button
            onClick={() =>
              triggerToast("top-center", {
                type: "info",
                message: "please wait loading file...",
              })
            }
            className="bg-blue-400 w-[10rem] py-3 rounded-md shadow text-white font-[550]"
          >
            Click Info !
          </button>
          {/* <button
            onClick={() =>
              triggerToast({
                type: "error",
                position: "top-right",
                message: "Failed to download file!",
              })
            }
            className="bg-red-400 w-[10rem] py-3 rounded-md shadow text-white font-[550]"
          >
            Click Error !
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Toast;
