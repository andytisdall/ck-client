import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import renderWithFallback from "../../../reusable/loading/renderWithFallback";

const DriverBase = lazy(() => import("./DriverBase"));
const DriverHome = lazy(() => import("./DriverHome"));
const License = lazy(() => import("./License"));
const Car = lazy(() => import("./Car"));

const Sign = lazy(() => import("../../../reusable/signature/Sign"));
const SignSuccess = lazy(
  () => import("../../../reusable/signature/SignSuccess")
);

const Calendar = lazy(() => import("../KitchenCalendar"));

const driverRouter: RouteObject = {
  path: "driver",
  element: renderWithFallback(<DriverBase />),
  children: [
    { index: true, element: renderWithFallback(<DriverHome />) },
    { path: "license", element: renderWithFallback(<License />) },
    { path: "car", element: renderWithFallback(<Car />) },
    {
      path: "sign",
      children: [
        {
          path: "success",
          element: renderWithFallback(<SignSuccess returnLink="../.." />),
        },
        { path: ":doc", element: renderWithFallback(<Sign />) },
      ],
    },
  ],
};

export default driverRouter;
