import { useContext } from "react";
import { ToastPosition, ToastType } from "../Common/type";
import ToastContainerContext from "./ToastContainerContext";

const useToast = () => {
  const context = useContext(ToastContainerContext);
  if (!context)
    throw new Error(
      "useToastNotification must be used within a ToastContainerProvider"
    );

  const { addToast } = context;

  const triggerToast = (
    position: ToastPosition,
    props: Omit<ToastType, "id">
  ) => addToast(position, props);

  return { triggerToast };
};

export default useToast;
