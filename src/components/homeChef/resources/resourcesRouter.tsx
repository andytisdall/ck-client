import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import "./Resources.css";
import renderWithFallback from "../../reusable/loading/renderWithFallback";
import suppliesRouter from "./supplies/suppliesRouter";

const Resources = lazy(() => import("./Resources"));
const ResourcesList = lazy(() => import("./ResourcesHome"));
const RecipeList = lazy(() => import("./recipes/RecipeList"));
const Recipe = lazy(() => import("./recipes/Recipe"));
const CreateRecipe = lazy(() => import("./recipes/CreateRecipe"));
const Labels = lazy(() => import("./Labels"));

const resourcesRouter: RouteObject = {
  path: "resources",
  element: renderWithFallback(<Resources />),
  children: [
    { index: true, element: renderWithFallback(<ResourcesList />) },
    suppliesRouter,
    {
      path: "recipes",
      children: [
        { index: true, element: renderWithFallback(<RecipeList />) },
        { path: ":recipeId", element: renderWithFallback(<Recipe />) },
        {
          path: "add-recipe",
          element: renderWithFallback(<CreateRecipe />),
        },
      ],
    },
    {
      path: "labels",
      element: renderWithFallback(<Labels />),
    },
  ],
};

export default resourcesRouter;
