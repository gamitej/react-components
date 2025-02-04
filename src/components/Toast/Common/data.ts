// icons
import { SiTicktick as SuccessIcon } from "react-icons/si";
import { MdErrorOutline as ErrorIcon } from "react-icons/md";
import { IoWarningOutline as WarningIcon } from "react-icons/io5";
import { IoMdInformationCircleOutline as InfoIcon } from "react-icons/io";
// types
import { ToastPosition, ToastTypes } from "./type";

export const toastTypeBackGroundMapping: Record<
  ToastTypes,
  { icon: any; bgColor: string }
> = {
  info: { icon: InfoIcon, bgColor: "bg-blue-400" },
  warning: { icon: WarningIcon, bgColor: "bg-red-400" },
  error: { icon: ErrorIcon, bgColor: "bg-orange-400" },
  success: { icon: SuccessIcon, bgColor: "bg-green-400" },
};

export const positionMapping: Record<ToastPosition, string> = {
  "top-left": "top-4 left-4",
  "top-center": "top-4 right-1/2",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2",
  "bottom-right": "bottom-4 right-4",
};
