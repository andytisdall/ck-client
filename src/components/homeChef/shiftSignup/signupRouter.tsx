import { lazy } from "react";

import renderWithFallback from "../../reusable/loading/renderWithFallback";

const ShiftSignup = lazy(() => import("./ShiftSignup"));
const VolunteerJobsList = lazy(() => import("./VolunteerJobsList"));
const Calendar = lazy(() => import("./HomeChefCalendar"));
const ShiftDetail = lazy(() => import("./ShiftDetail"));
const Confirmation = lazy(() => import("./Confirmation"));
const DeliverToKitchen = lazy(() => import("./DeliverToKitchen"));
const JobDetail = lazy(() => import("./JobDetail"));

const signupRouter = {
  path: "signup",
  element: renderWithFallback(<ShiftSignup />),
  children: [
    { path: "list", element: renderWithFallback(<VolunteerJobsList />) },
    {
      path: "deliver-to-kitchen",
      element: renderWithFallback(<DeliverToKitchen />),
    },
    { path: "calendar", element: renderWithFallback(<Calendar />) },
    {
      path: "shift/:shiftId",
      element: renderWithFallback(<ShiftDetail />),
    },
    { path: "job/:jobId", element: renderWithFallback(<JobDetail />) },
    {
      path: "confirm/:hoursId",
      element: renderWithFallback(<Confirmation />),
    },
  ],
};

export default signupRouter;
