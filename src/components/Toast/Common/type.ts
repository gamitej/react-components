export type ToastTypes = "success" | "info" | "warning" | "error";
export type ToastAnimation = "fade" | "slide";
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

export interface ToastNotificationProps {
  message: string;
  type: ToastTypes;
  duration?: number;
  animation?: ToastAnimation;
}

export interface ToastType extends ToastNotificationProps {
  id: string;
}
