import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home"));
const Dropdown = lazy(() => import("@/pages/Dropdown"));
const DatePicker = lazy(() => import("@/pages/DatePicker"));

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
      element: <DatePicker />,
    },
  ]);

  return <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>;
};

export default Router;
