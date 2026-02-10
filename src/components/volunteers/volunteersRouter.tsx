import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import "./Volunteers.css";
import renderWithFallback from "../reusable/loading/renderWithFallback";
import driverRouter from "./driver/driverRouter";
import signupRouter from "./signup/signupRouter";

const Sign = lazy(() => import("../reusable/signature/Sign"));
const SignSuccess = lazy(() => import("../reusable/signature/SignSuccess"));

const VolunteersHome = lazy(() => import("./VolunteersHome"));
const ConfirmationBase = lazy(() => import("./confirmation/ConfirmationBase"));
const VolunteersBase = lazy(() => import("./VolunteersBase"));

const TownFridges = lazy(() => import("./townFridges/TownFridges"));

const volunteersRouter: RouteObject = {
  path: "volunteers",
  element: renderWithFallback(<VolunteersBase />),
  children: [
    { index: true, element: renderWithFallback(<VolunteersHome />) },
    {
      path: "confirm/:contactId/:hoursId",
      element: renderWithFallback(<ConfirmationBase />),
    },
    {
      path: "town-fridges",
      element: renderWithFallback(<TownFridges />),
    },
    {
      path: "town-fridges/:region",
      element: renderWithFallback(<TownFridges />),
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
    driverRouter,
    signupRouter,
  ],
};

export default volunteersRouter;
