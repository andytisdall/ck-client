import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import renderWithFallback from "../../../reusable/loading/renderWithFallback";

const DriverBase = lazy(() => import("./DriverBase"));
const DriverSignupBase = lazy(() => import("./DriverSignupBase"));
const License = lazy(() => import("./License"));
const Car = lazy(() => import("./Car"));

const Sign = lazy(() => import("../../../reusable/signature/Sign"));
const SignSuccess = lazy(
  () => import("../../../reusable/signature/SignSuccess")
);

const Onboarding = lazy(() => import("./Onboarding"));

const Calendar = lazy(() => import("../KitchenCalendar"));

const driverRouter: RouteObject = {
  path: "driver",
  element: renderWithFallback(<DriverBase />),
  children: [
    {
      index: true,
      element: renderWithFallback(<DriverSignupBase />),
    },
    // {
    //   path: "/",
    //   element: renderWithFallback(<JobList />),
    // },

    // { path: "cal", element: renderWithFallback(<KitchenCalendar />) },

    // {
    //   path: ":shiftId",
    //   element: renderWithFallback(<ShiftSignup />),
    // },
    {
      path: "onboarding",
      element: <Onboarding />,
      children: [
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
    },
  ],
};

export default driverRouter;
