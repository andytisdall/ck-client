import { RouteObject } from "react-router-dom";
import { lazy } from "react";

import "./Form.css";
import renderWithFallback from "../reusable/loading/renderWithFallback";

const Form = lazy(() => import("./Form"));
const FormSent = lazy(() => import("./FormSent"));

// const MealQualitySurvey = lazy(() => import('./old/MealQualitySurvey'));
// const TextSignupSurvey = lazy(() => import('./old/TextSignupSurvey'));
const NewMealSurvey = lazy(() => import("./meal-program/NewMealSurvey"));
const CBOReport = lazy(() => import("./meal-program/CBOReport"));

const HomeChefRegistration = lazy(
  () => import("./volunteer/HomeChefRegistration")
);
const VolunteerInterestForm = lazy(
  () => import("./volunteer/VolunteerInterestForm")
);

const Bike = lazy(() => import("./volunteer/Bike"));

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
      element: renderWithFallback(<Bike />),
    },
    // { path: 'meal-survey', element: renderWithFallback(<MealQualitySurvey />) },
    // {
    //   path: 'text-signup-survey',
    //   element: renderWithFallback(<TextSignupSurvey />),
    // },
    {
      path: "cbo-report",
      element: renderWithFallback(<CBOReport />),
    },
    { path: "form-sent", element: renderWithFallback(<FormSent />) },
    {
      path: "home-chef-registration",
      element: renderWithFallback(<HomeChefRegistration />),
    },
    { path: "meal-survey", element: renderWithFallback(<NewMealSurvey />) },
  ],
};

export default formsRouter;
