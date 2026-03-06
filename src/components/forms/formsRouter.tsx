import { RouteObject, Navigate } from "react-router-dom";
import { lazy } from "react";

import "./Form.css";
import renderWithFallback from "../reusable/loading/renderWithFallback";
import volunteerCampaignConfig from "../volunteers/config";

const Form = lazy(() => import("./Form"));
const FormSent = lazy(() => import("./FormSent"));

const NewMealSurvey = lazy(() => import("./meal-program/NewMealSurvey"));
const CBOReport = lazy(() => import("./meal-program/CBOReport"));
const VolunteerInterestForm = lazy(
  () => import("./volunteer/VolunteerInterestForm"),
);
const MealsPlus = lazy(() => import("./meal-program/MealsPlus"));

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
    { path: "meal-survey", element: renderWithFallback(<NewMealSurvey />) },
    { path: "form-sent", element: renderWithFallback(<FormSent />) },
    { path: "meals-plus", element: renderWithFallback(<MealsPlus />) },
  ],
};

export default formsRouter;
