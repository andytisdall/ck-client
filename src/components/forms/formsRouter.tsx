import { Outlet, RouteObject } from 'react-router-dom';
import { lazy } from 'react';

import './Form.css';
import renderWithFallback from '../reusable/loading/renderWithFallback';

const VolunteerInterestForm = lazy(() => import('./VolunteerInterestForm'));
const FormSent = lazy(() => import('./FormSent'));
const MealQualitySurvey = lazy(() => import('./MealQualitySurvey'));
const TextSignupSurvey = lazy(() => import('./TextSignupSurvey'));
const MealProgramIntake = lazy(() => import('./MealProgramIntake'));
const CBOReport = lazy(() => import('./CBOReport'));
const D4JSurvey = lazy(() => import('./D4JSurvey'));
const HomeChefRegistration = lazy(() => import('./HomeChefRegistration'));

const Forms = () => {
  const headerImage = () => {
    return (
      <img
        src="../images/logos/ck-header.png"
        alt="Community Kitchens"
        className="form-item form-image"
      />
    );
  };

  return (
    <div className="form-background">
      <div className="form main">
        {headerImage()}
        <Outlet />
      </div>
    </div>
  );
};

const formsRouter: RouteObject = {
  path: 'forms',
  element: <Forms />,
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
    { path: 'd4j-survey', element: renderWithFallback(<D4JSurvey />) },
    {
      path: 'home-chef-registration',
      element: renderWithFallback(<HomeChefRegistration />),
    },
  ],
};

export default formsRouter;
