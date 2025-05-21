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
const JobList = lazy(() => import("../../JobList"));
const KitchenCalendar = lazy(() => import("../KitchenCalendar"));
const ShiftSignup = lazy(() => import("../../ShiftSignup"));

const driverRouter: RouteObject = {
  path: "driver",
  element: renderWithFallback(<DriverBase />),
  children: [
    {
      index: true,
      element: renderWithFallback(
        <JobList campaignIdProp="701U800000O3WxhIAF" />
      ),
    },

    {
      path: "cal",
      element: renderWithFallback(
        <KitchenCalendar campaignIdProp="701U800000O3WxhIAF" />
      ),
    },

    {
      path: ":shiftId",
      element: renderWithFallback(<ShiftSignup />),
    },
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
