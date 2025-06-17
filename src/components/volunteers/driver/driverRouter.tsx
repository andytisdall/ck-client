import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import renderWithFallback from "../../reusable/loading/renderWithFallback";
import "./Driver.css";

const License = lazy(() => import("./License"));
const Car = lazy(() => import("./Car"));
const Insurance = lazy(() => import("./Insurance"));

const Sign = lazy(() => import("../../reusable/signature/Sign"));
const SignSuccess = lazy(() => import("../../reusable/signature/SignSuccess"));

const Onboarding = lazy(() => import("./Onboarding"));

const driverRouter: RouteObject = {
  path: "driver-onboarding",

  children: [
    { index: true, element: renderWithFallback(<Onboarding />) },
    { path: "license", element: renderWithFallback(<License />) },
    { path: "insurance", element: renderWithFallback(<Insurance />) },

    { path: "car", element: renderWithFallback(<Car />) },
    {
      path: "sign",
      children: [
        {
          path: "success",
          element: renderWithFallback(<SignSuccess returnLink="../.." />),
        },
        { path: ":doc", element: renderWithFallback(<Sign />) },
      ],
    },
  ],
};

export default driverRouter;
