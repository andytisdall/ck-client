import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import "./Admin.css";

import renderWithFallback from "../reusable/loading/renderWithFallback";

const AdminHome = lazy(() => import("./AdminHome"));
const Restaurant = lazy(() => import("./restaurant/Restaurant"));
const User = lazy(() => import("./user/User"));
const HomeChefNotification = lazy(
  () => import("./notifications/HomeChefNotification")
);
const AdminBase = lazy(() => import("./AdminBase"));
const D4JNotification = lazy(() => import("./notifications/D4JNotification"));
const NotificationsHome = lazy(
  () => import("./notifications/NotificationsHome")
);
const D4J = lazy(() => import("./d4j/D4J"));
const ScanBarcode = lazy(() => import("./doorfront/ScanBarcode"));
const AddMeals = lazy(() => import("./doorfront/AddMeals"));

const adminRouter: RouteObject = {
  path: "admin",
  element: renderWithFallback(<AdminBase />),
  children: [
    {
      index: true,
      element: renderWithFallback(<AdminHome />),
    },
    { path: "d4j", element: renderWithFallback(<D4J />) },
    { path: "user", element: renderWithFallback(<User />) },
    { path: "restaurant", element: renderWithFallback(<Restaurant />) },
    {
      path: "scan",
      children: [
        { index: true, element: renderWithFallback(<ScanBarcode />) },
        { path: ":clientId", element: renderWithFallback(<AddMeals />) },
      ],
    },
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
