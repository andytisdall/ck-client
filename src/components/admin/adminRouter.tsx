import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import renderWithFallback from "../reusable/loading/renderWithFallback";

const AdminHome = lazy(() => import("./AdminHome"));
const User = lazy(() => import("./user/User"));
const HomeChefNotification = lazy(
  () => import("./notifications/HomeChefNotification"),
);
const AdminBase = lazy(() => import("./AdminBase"));
const D4JNotification = lazy(() => import("./notifications/D4JNotification"));
const NotificationsHome = lazy(
  () => import("./notifications/NotificationsHome"),
);
const CheckVoicemail = lazy(() => import("./CheckVoicemail"));
// const RSVPList = lazy(() => import("./rsvp/RSVPList"));
const Orders = lazy(() => import("./supplyOrders/Orders"));

const adminRouter: RouteObject = {
  path: "admin",
  element: renderWithFallback(<AdminBase />),
  children: [
    {
      index: true,
      element: renderWithFallback(<AdminHome />),
    },
    { path: "user", element: renderWithFallback(<User />) },
    {
      path: "home-chef-supplies",
      element: renderWithFallback(<Orders />),
    },
    { path: "voicemail", element: renderWithFallback(<CheckVoicemail />) },
    // { path: "rsvp", element: renderWithFallback(<RSVPList />) },
    {
      path: "notifications",
      children: [
        { index: true, element: renderWithFallback(<NotificationsHome />) },
        {
          path: "home-chef",
          element: renderWithFallback(<HomeChefNotification />),
        },
        { path: "d4j", element: renderWithFallback(<D4JNotification />) },
      ],
    },
  ],
};

export default adminRouter;
