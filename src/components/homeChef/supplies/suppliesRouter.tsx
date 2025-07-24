import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import renderWithFallback from "../../reusable/loading/renderWithFallback";

const SuppliesHome = lazy(() => import("./SuppliesHome"));

const suppliesRouter: RouteObject = {
  path: "supplies",
  children: [{ index: true, element: renderWithFallback(<SuppliesHome />) }],
};

export default suppliesRouter;
