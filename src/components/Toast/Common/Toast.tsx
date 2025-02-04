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
  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      onRemove(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration]);

  useEffect(() => {
    let time = 100;

    const interval = setInterval(() => {
      setPercentage((state) => state + 1);
    }, duration / time);

    return () => clearInterval(interval);
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
      className={`relative transition-all ease-in-out overflow-hidden ${
        visible ? "opacity-100 duration-300" : "opacity-0 duration-300"
      }`}
    >
      <span
        style={{ width: `${percentage}%` }}
        className="absolute -bottom-1 left-0 bg-white opacity-20 h-[calc(100%+12px)] z-10"
      ></span>

      <div
        className={`relative ${bgColor} pl-4 pr-14 py-3 rounded-md shadow cursor-pointer hover:shadow-sm hover:shadow-white flex justify-center gap-4 items-center`}
      >
        <span>
          <Icon className="text-white text-2xl" />
        </span>
        <span className="text-white text-xl">{message}</span>
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
