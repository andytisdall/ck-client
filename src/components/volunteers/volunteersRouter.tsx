import { lazy } from "react";
import { Outlet, RouteObject, Link } from "react-router-dom";

import "./Volunteers.css";
import renderWithFallback from "../reusable/loading/renderWithFallback";
import driverRouter from "./driver/driverRouter";

const GetVolunteer = lazy(() => import("./getVolunteer/GetVolunteer"));

const Sign = lazy(() => import("../reusable/signature/Sign"));
const SignSuccess = lazy(() => import("../reusable/signature/SignSuccess"));

const VolunteersHome = lazy(() => import("./VolunteersHome"));
const ConfirmationBase = lazy(() => import("./Confirmation/ConfirmationBase"));

const CampaignBase = lazy(() => import("./CampaignBase"));
const JobList = lazy(() => import("./JobList"));
const VolunteerCalendar = lazy(() => import("./calendar/CalendarBase"));

const ShiftSignup = lazy(() => import("./signup/SignupBase"));
const VolunteerSignInBase = lazy(() => import("./VolunteerSignInBase"));

const VolunteersBase = () => {
  return (
    <div className="main home-chef">
      <Link to="/volunteers">
        <h1 className="volunteers-main-header">CK Volunteers</h1>
      </Link>
      <Outlet />
    </div>
  );
};

const volunteersRouter: RouteObject = {
  path: "volunteers",
  element: <VolunteersBase />,
  children: [
    { index: true, element: renderWithFallback(<VolunteersHome />) },
    {
      path: "confirm/:contactId/:hoursId",
      element: renderWithFallback(<ConfirmationBase />),
    },
    driverRouter,
    {
      path: "signin/:campaignId",
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
              element: renderWithFallback(<JobList />),
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
