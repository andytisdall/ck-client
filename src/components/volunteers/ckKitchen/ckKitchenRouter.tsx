import { RouteObject } from "react-router-dom";
import { lazy } from "react";

import renderWithFallback from "../../reusable/loading/renderWithFallback";
import JobList from "../JobList";
import driverRouter from "./driver/driverRouter";

const KitchenCalendar = lazy(() => import("./KitchenCalendar"));
const KitchenSignupBase = lazy(() => import("./KitchenSignupBase"));

const ShiftSignup = lazy(() => import("../ShiftSignup"));

const GetVolunteer = lazy(() => import("../getVolunteer/GetVolunteer"));

const ckKitchenRouter: RouteObject = {
  path: "ck-kitchen",
  children: [
    driverRouter,
    {
      path: "signin/:campaignId",
      element: renderWithFallback(<GetVolunteer />),
    },
    {
      path: "signup/:campaignId",
      element: renderWithFallback(<KitchenSignupBase />),
      children: [
        {
          index: true,
          element: renderWithFallback(<JobList />),
        },

        { path: "cal", element: renderWithFallback(<KitchenCalendar />) },

        {
          path: ":shiftId",
          element: renderWithFallback(<ShiftSignup />),
        },
      ],
    },
  ],
};

export default ckKitchenRouter;
