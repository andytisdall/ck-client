import { Outlet } from 'react-router-dom';
import React from 'react';

import './Form.css';
import renderWithFallback from '../reusable/renderWithFallback';

const HCInterestForm = React.lazy(() => import('./HCInterestForm'));
const FormSent = React.lazy(() => import('./FormSent'));
const MealQualitySurvey = React.lazy(() => import('./MealQualitySurvey'));
const TextSignupSurvey = React.lazy(() => import('./TextSignupSurvey'));
const MealProgramIntake = React.lazy(() => import('./MealProgramIntake'));

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

const formsRouter = {
  path: 'forms',
  element: <Forms />,
  children: [
    { path: 'home-chef', element: renderWithFallback(<HCInterestForm />) },
    { path: 'meal-survey', element: renderWithFallback(<MealQualitySurvey />) },
    {
      path: 'text-signup-survey',
      element: renderWithFallback(<TextSignupSurvey />),
    },
    {
      path: 'meal-program-intake',
      element: renderWithFallback(<MealProgramIntake />),
    },
    { path: 'form-sent', element: renderWithFallback(<FormSent />) },
  ],
};

export default formsRouter;
