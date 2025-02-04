// import { ToastType } from "../Common/type";
import {
  ToastType,
  ToastNotificationProps,
  ToastPosition,
} from "../Common/type";
import ToastContainer from "./ToastContainer";
import { createContext, ReactNode, useState } from "react";

interface ToastContainerContextType {
  addToast: (position: ToastPosition, toast: ToastNotificationProps) => void;
}

const ToastContainerContext = createContext<
  ToastContainerContextType | undefined
>(undefined);

export const ToastContainerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const [position, setPosition] = useState<ToastPosition>("top-right");

  const addToast = (position: ToastPosition, toast: ToastNotificationProps) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setPosition(position);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContainerContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer
        toasts={toasts}
        position={position}
        removeToast={removeToast}
      />
    </ToastContainerContext.Provider>
  );
};

export default ToastContainerContext;
