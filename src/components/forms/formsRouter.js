import { Outlet } from 'react-router-dom';

import HCInterestForm from './HCInterestForm';
import FormSent from './FormSent';
import MealQualitySurvey from './MealQualitySurvey';
import TextSignupSurvey from './TextSignupSurvey';

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
      <div className="form">
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
    { path: 'home-chef', element: <HCInterestForm /> },
    { path: 'meal-survey', element: <MealQualitySurvey /> },
    { path: 'text-signup-survey', element: <TextSignupSurvey /> },
    { path: 'form-sent', element: <FormSent /> },
  ],
};

export default formsRouter;
