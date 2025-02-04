import Toast from "../Common/Toast";
import { positionMapping } from "../Common/data";
import { ToastPosition, ToastType } from "../Common/type";

interface ToastContainerProps {
  toasts: ToastType[];
  position: ToastPosition;
  removeToast: (id: string) => void;
}

const ToastContainer = ({
  toasts,
  position,
  removeToast,
}: ToastContainerProps) => {
  const selectedPosition = positionMapping[position] ?? "top-4 right-4";

  /**
   * TSX
   */
  return (
    <div className={`fixed ${selectedPosition} flex flex-col gap-3`}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onRemove={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;
