import HCInterestForm from './HCInterestForm';
import FormSent from './FormSent';
import Survey from './Survey';

const formsRouter = {
  path: 'forms',
  children: [
    { path: 'home-chef', element: <HCInterestForm /> },
    { path: 'meal-survey', element: <Survey /> },
    { path: 'form-sent', element: <FormSent /> },
  ],
};

export default formsRouter;
