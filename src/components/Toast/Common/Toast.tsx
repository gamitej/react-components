import { ToastType } from "./type";
import { useEffect, useState } from "react";
import { RxCross2 as CloseIcon } from "react-icons/rx";
import { toastTypeBackGroundMapping } from "./data";

interface ToastProps extends ToastType {
  onRemove: (id: string) => void;
}

const Toast = ({
  id,
  type,
  message,
  onRemove,
  duration = 3000,
}: // animation,
ToastProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      onRemove(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onRemove(id), 300);
  };

  const { icon: Icon, bgColor } = toastTypeBackGroundMapping[type];

  /**
   * TSX
   */
  return (
    <div
      className={`transition-all ease-in-out ${
        visible ? "opacity-100 duration-300" : "opacity-0 duration-300"
      }`}
    >
      <div
        className={`relative ${bgColor} pl-4 pr-14 py-3 rounded-md shadow cursor-pointer hover:shadow-sm hover:shadow-white flex justify-center gap-4 items-center`}
      >
        <span>
          <Icon className="text-white text-2xl" />
        </span>
        <span className="text-white text-xl">
          {id.slice(0, 3)}
          {message}
        </span>
        <span
          onClick={() => handleClose()}
          className="absolute right-4 text-center"
        >
          <CloseIcon className="text-white text-lg" />
        </span>
      </div>
    </div>
  );
};

export default Toast;
