import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
// components
import { DatePickerProvider } from "@/components/Calendar/BasicDatePicker/context/DatePickerContext";
// pages
const Home = lazy(() => import("@/pages/Home"));
const Dropdown = lazy(() => import("@/pages/Dropdown"));
const DatePicker = lazy(() => import("@/pages/DatePicker"));
const Toast = lazy(() => import("@/pages/Toast"));

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
      element: <Toast />,
    },
  ]);

  return <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>;
};

export default Router;
