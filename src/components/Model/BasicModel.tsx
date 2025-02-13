import { createPortal } from "react-dom";
import { FC, MouseEvent, ReactNode, useRef, useEffect } from "react";

interface BasicModelProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const BasicModel: FC<BasicModelProps> = ({ isOpen, onClose, children }) => {
  const childDivRef = useRef<HTMLDivElement | null>(null);
  const modalRoot = document.getElementById("modal-root");

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    if (
      childDivRef.current &&
      !childDivRef.current.contains(e.target as Node)
    ) {
      onClose();
    }
  };

  // Focus the modal when it opens
  useEffect(() => {
    if (isOpen && childDivRef.current) {
      childDivRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen || !modalRoot) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
      className="fixed top-0 left-0 right-0 bottom-0 z-[1000] flex justify-center items-center bg-black bg-opacity-50"
    >
      <div
        tabIndex={-1}
        ref={childDivRef}
        className="relative w-[25rem] h-[25rem] bg-white rounded-xl p-4 shadow-md"
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-2 right-2 text-4xl text-gray-700 w-10 h-10 rounded-full hover:bg-gray-100 hover:shadow border border-gray-300 text-center flex justify-center items-center pb-1"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default BasicModel;
