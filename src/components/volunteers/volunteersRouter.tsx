import { lazy } from "react";
import { RouteObject, Navigate } from "react-router-dom";

import "./Volunteers.css";
import renderWithFallback from "../reusable/loading/renderWithFallback";
import driverRouter from "./driver/driverRouter";

const GetVolunteer = lazy(() => import("./getVolunteer/GetVolunteer"));

const Sign = lazy(() => import("../reusable/signature/Sign"));
const SignSuccess = lazy(() => import("../reusable/signature/SignSuccess"));

const VolunteersHome = lazy(() => import("./VolunteersHome"));
const ConfirmationBase = lazy(() => import("./confirmation/ConfirmationBase"));

const CampaignBase = lazy(() => import("./CampaignBase"));
const JobListBase = lazy(() => import("./jobList/JobListBase"));
const VolunteerCalendar = lazy(() => import("./calendar/CalendarBase"));

const ShiftSignup = lazy(() => import("./signup/SignupBase"));
const VolunteerSignInBase = lazy(() => import("./VolunteerSignInBase"));

const VolunteersBase = lazy(() => import("./VolunteersBase"));

const volunteersRouter: RouteObject = {
  path: "volunteers",
  element: renderWithFallback(<VolunteersBase />),
  children: [
    { index: true, element: renderWithFallback(<VolunteersHome />) },
    {
      path: "confirm/:contactId/:hoursId",
      element: renderWithFallback(<ConfirmationBase />),
    },
    driverRouter,
    {
      path: "signin/:campaignId/:shiftId",
      element: renderWithFallback(<GetVolunteer />),
    },
    {
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
    },

    {
      path: "sign",
      children: [
        {
          path: "success/:contactId/:hoursId",
          element: renderWithFallback(<SignSuccess />),
        },
        {
          path: ":doc/:contactId/:hoursId",
          element: renderWithFallback(<Sign />),
        },
      ],
    },
  ],
};

export default volunteersRouter;
