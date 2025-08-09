import { RouteObject } from "react-router-dom";
import { lazy } from "react";

import renderWithFallback from "../reusable/loading/renderWithFallback";

const ScanBarcode = lazy(() => import("./scan/ScanBarcode"));
const AddMeals = lazy(() => import("./scan/AddMeals"));
const DoorfrontBase = lazy(() => import("./DoorfrontBase"));
const MealReport = lazy(() => import("./report/meal/MealReport"));
const ClientReport = lazy(() => import("./report/client/ClientReport"));
const DoorfrontHome = lazy(() => import("./DoorfrontHome"));
const ClientDetail = lazy(() => import("./report/client/ClientDetail"));

const doorfrontRouter: RouteObject = {
  path: "doorfront",
  element: renderWithFallback(<DoorfrontBase />),
  children: [
    { index: true, element: renderWithFallback(<DoorfrontHome />) },
    {
      path: "scan",
      children: [
        { index: true, element: renderWithFallback(<ScanBarcode />) },
        { path: ":scanValue", element: renderWithFallback(<AddMeals />) },
      ],
    },
    { path: "meal-report", element: renderWithFallback(<MealReport />) },
    {
      path: "client-report",
      children: [
        { index: true, element: renderWithFallback(<ClientReport />) },
        { path: ":id", element: renderWithFallback(<ClientDetail />) },
      ],
    },
  ],
};

export default doorfrontRouter;
