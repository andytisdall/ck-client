import { RouteObject, Navigate } from "react-router-dom";
import { lazy } from "react";

import "./Form.css";
import renderWithFallback from "../reusable/loading/renderWithFallback";
import volunteerCampaignConfig from "../volunteers/config";

const Form = lazy(() => import("./Form"));
const FormSent = lazy(() => import("./FormSent"));

const CBOReport = lazy(() => import("./meal-program/CBOReport"));
const VolunteerInterestForm = lazy(
  () => import("./volunteer/VolunteerInterestForm"),
);
const MealsPlus = lazy(() => import("./meal-program/MealsPlus"));
const HomeChefOrientation = lazy(
  () => import("./volunteer/HomeChefOrientation"),
);

const BallersRSVP = lazy(() => import("./BallersRSVP"));

const MealSurveyV3 = lazy(() => import("./meal-program/MealSurveyV3"));

const formsRouter: RouteObject = {
  path: "forms",
  element: renderWithFallback(<Form />),
  children: [
    {
      path: "volunteer",
      element: renderWithFallback(<VolunteerInterestForm />),
    },
    {
      path: "bike",
      element: (
        <Navigate
          replace
          to={`/volunteers/signup/${volunteerCampaignConfig.bike.id}`}
        />
      ),
    },
    {
      path: "cbo-report",
      element: renderWithFallback(<CBOReport />),
    },
    { path: "form-sent", element: renderWithFallback(<FormSent />) },
    { path: "meals-plus", element: renderWithFallback(<MealsPlus />) },
    {
      path: "home-chef-orientation",
      element: renderWithFallback(<HomeChefOrientation />),
    },
    { path: "ballers", element: renderWithFallback(<BallersRSVP />) },
    { path: "meal-survey", element: renderWithFallback(<MealSurveyV3 />) },
  ],
};

export default formsRouter;
