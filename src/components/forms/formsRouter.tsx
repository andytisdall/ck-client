import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

import './Form.css';
import renderWithFallback from '../reusable/loading/renderWithFallback';

const VolunteerInterestForm = lazy(() => import('./VolunteerInterestForm'));
const FormSent = lazy(() => import('./FormSent'));
const MealQualitySurvey = lazy(() => import('./MealQualitySurvey'));
const TextSignupSurvey = lazy(() => import('./TextSignupSurvey'));
const MealProgramIntake = lazy(() => import('./MealProgramIntake'));
const CBOReport = lazy(() => import('./CBOReport'));
const HomeChefRegistration = lazy(() => import('./HomeChefRegistration'));
const CookieParty = lazy(() => import('./CookieParty'));
const Form = lazy(() => import('./Form'));
const NewMealSurvery = lazy(() => import('./NewMealSurvey'));

const formsRouter: RouteObject = {
  path: 'forms',
  element: renderWithFallback(<Form />),
  children: [
    {
      path: 'volunteer',
      element: renderWithFallback(<VolunteerInterestForm />),
    },
    { path: 'meal-survey', element: renderWithFallback(<MealQualitySurvey />) },
    {
      path: 'text-signup-survey',
      element: renderWithFallback(<TextSignupSurvey />),
    },
    {
      path: 'meal-program-intake',
      element: renderWithFallback(<MealProgramIntake />),
    },
    {
      path: 'cbo-report',
      element: renderWithFallback(<CBOReport />),
    },
    { path: 'form-sent', element: renderWithFallback(<FormSent />) },
    {
      path: 'home-chef-registration',
      element: renderWithFallback(<HomeChefRegistration />),
    },
    { path: 'cookie-party', element: renderWithFallback(<CookieParty />) },
    { path: 'meal-survey-2', element: renderWithFallback(<NewMealSurvery />) },
  ],
};

export default formsRouter;
