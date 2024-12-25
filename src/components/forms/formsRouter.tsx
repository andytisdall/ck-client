import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

import './Form.css';
import renderWithFallback from '../reusable/loading/renderWithFallback';

const Form = lazy(() => import('./Form'));
const FormSent = lazy(() => import('./FormSent'));

const MealQualitySurvey = lazy(
  () => import('./meal-program/MealQualitySurvey')
);
const TextSignupSurvey = lazy(() => import('./meal-program/TextSignupSurvey'));
const MealProgramIntake = lazy(
  () => import('./meal-program/MealProgramIntake')
);
const NewMealSurvery = lazy(() => import('./meal-program/NewMealSurvey'));
const CBOReport = lazy(() => import('./meal-program/CBOReport'));

const HomeChefRegistration = lazy(
  () => import('./volunteer/HomeChefRegistration')
);
const VolunteerInterestForm = lazy(
  () => import('./volunteer/VolunteerInterestForm')
);

const VolunteerAppreciation2024 = lazy(
  () => import('./events/VolunteerAppeciation2024')
);
const KitchenWaiverSuccess = lazy(
  () => import('./volunteer/KitchenWaiverSuccess')
);

const SignKitchenWaiver = lazy(() => import('./volunteer/SignKitchenWaiver'));

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
    { path: 'meal-survey-2', element: renderWithFallback(<NewMealSurvery />) },
    {
      path: 'volunteer-appreciation',
      element: renderWithFallback(<VolunteerAppreciation2024 />),
    },
    {
      path: 'kitchen-agreement',
      element: renderWithFallback(<SignKitchenWaiver />),
    },
    {
      path: 'kitchen-agreement/success/:email',
      element: renderWithFallback(<KitchenWaiverSuccess />),
    },
  ],
};

export default formsRouter;
