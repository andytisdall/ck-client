import { RouteObject } from "react-router-dom";
import { lazy } from "react";

import renderWithFallback from "../reusable/loading/renderWithFallback";

const ScanBarcode = lazy(() => import("./ScanBarcode"));
const AddMeals = lazy(() => import("./AddMeals"));
const DoorfrontBase = lazy(() => import("./DoorfrontBase"));
const MealReport = lazy(() => import("./report/MealReport"));

const doorfrontRouter: RouteObject = {
  path: "doorfront",
  element: renderWithFallback(<DoorfrontBase />),
  children: [
    { index: true, element: renderWithFallback(<ScanBarcode />) },
    { path: ":barcodeValue", element: renderWithFallback(<AddMeals />) },
    { path: "meal-report", element: renderWithFallback(<MealReport />) },
  ],
};

export default doorfrontRouter;
