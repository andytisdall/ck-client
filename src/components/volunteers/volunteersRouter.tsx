import { lazy } from "react";
import { Outlet, RouteObject, Link } from "react-router-dom";

import "./Volunteers.css";
import renderWithFallback from "../reusable/loading/renderWithFallback";
import eventsRouter from "./events/eventsRouter";
import ckKitchenRouter from "./ckKitchen/ckKitchenRouter";

const Sign = lazy(() => import("../reusable/signature/Sign"));
const SignSuccess = lazy(() => import("../reusable/signature/SignSuccess"));

const VolunteersHome = lazy(() => import("./VolunteersHome"));
const Confirmation = lazy(() => import("./Confirmation"));
const DriverVolunteer = lazy(() => import("./DriverSignUp"));

const VolunteersBase = () => {
  return (
    <div className="main volunteers">
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
      element: renderWithFallback(<Confirmation />),
    },
    eventsRouter,
    ckKitchenRouter,
    { path: "driver", element: renderWithFallback(<DriverVolunteer />) },
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
