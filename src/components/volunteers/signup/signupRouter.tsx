import { RouteObject, Navigate } from "react-router-dom";
import { lazy } from "react";

import renderWithFallback from "../../reusable/loading/renderWithFallback";

const CampaignBase = lazy(() => import("./CampaignBase"));
const JobListBase = lazy(() => import("./jobList/JobListBase"));
const VolunteerCalendar = lazy(() => import("./calendar/CalendarBase"));

const ShiftSignup = lazy(() => import("./SignupBase"));
const VolunteerSignInBase = lazy(() => import("./VolunteerSignInBase"));

const signupRouter: RouteObject = {
  path: "signup",
  element: renderWithFallback(<VolunteerSignInBase />),
  children: [
    {
      path: ":campaignId",
      element: renderWithFallback(<CampaignBase />),
      children: [
        {
          index: true,
          element: <Navigate replace to="list" />,
        },
        {
          path: "list",
          element: renderWithFallback(<JobListBase />),
        },

        { path: "cal", element: renderWithFallback(<VolunteerCalendar />) },

        {
          path: ":shiftId",
          element: renderWithFallback(<ShiftSignup />),
        },
      ],
    },
  ],
};

export default signupRouter;
