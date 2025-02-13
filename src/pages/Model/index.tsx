import BasicModel from "@/components/Model/BasicModel";
import { useState } from "react";

const Model = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  /**
   * TSX
   */
  return (
    <div className="h-[50vh] flex justify-center items-center">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded-md shadow bg-white text-gray-700 font-semibold uppercase"
      >
        View Model
      </button>
      <BasicModel isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div>hi</div>
      </BasicModel>
    </div>
  );
};

export default Model;
