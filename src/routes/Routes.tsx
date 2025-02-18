import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
// components
import { ToastContainerProvider } from "@/components/Toast/ContextApproach/ToastContainerContext";
import { DatePickerProvider } from "@/components/Calendar/BasicDatePicker/context/DatePickerContext";

// pages
const Home = lazy(() => import("@/pages/Home"));
const Toast = lazy(() => import("@/pages/Toast"));
const Model = lazy(() => import("@/pages/Model"));
const Stepper = lazy(() => import("@/pages/Stepper"));
const Dropdown = lazy(() => import("@/pages/Dropdown"));
const DatePicker = lazy(() => import("@/pages/DatePicker"));
const MultiSelect = lazy(() => import("@/components/Dropdowns/MultiSelect"));

const OtpComponent = lazy(() => import("@/components/Otp"));

const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "dropdown",
      element: <Dropdown />,
    },
    {
      path: "calendar",
      element: (
        <DatePickerProvider>
          <DatePicker />,
        </DatePickerProvider>
      ),
    },
    {
      path: "toast",
      element: (
        <ToastContainerProvider>
          <Toast />
        </ToastContainerProvider>
      ),
    },
    {
      path: "stepper",
      element: <Stepper />,
    },
    {
      path: "otp",
      element: <OtpComponent />,
    },
    {
      path: "model",
      element: <Model />,
    },
    {
      path: "multiselect",
      element: <MultiSelect />,
    },
  ]);

  return <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>;
};

export default Router;
