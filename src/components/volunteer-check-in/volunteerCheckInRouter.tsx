import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import renderWithFallback from '../reusable/loading/renderWithFallback';

const CheckInVolunteerBase = lazy(() => import('./CheckInVolunteerBase'));
const CheckInList = lazy(() => import('./CheckInVolunteersList'));
const CheckInConfirm = lazy(() => import('./CheckInConfirm'));
const CheckInSuccess = lazy(() => import('./CheckInSuccess'));
const CheckInHome = lazy(() => import('./CheckInHome'));
const CreateVolunteer = lazy(() => import('./CreateVolunteer'));

const Sign = lazy(() => import('../reusable/signature/Sign'));
const SignSuccess = lazy(() => import('../reusable/signature/SignSuccess'));
const CheckInSign = lazy(() => import('./CheckInSign'));

const volunteerCheckInRouter: RouteObject = {
  path: 'volunteer-check-in',
  element: renderWithFallback(<CheckInVolunteerBase />),
  errorElement: renderWithFallback(<div>Start Over</div>),
  children: [
    { index: true, element: renderWithFallback(<CheckInHome />) },
    {
      path: 'list/:shiftId',
      element: renderWithFallback(<CheckInList />),
    },
    {
      path: 'confirm/:shiftId/:contactId',
      element: renderWithFallback(<CheckInConfirm />),
    },
    {
      path: 'success/:shiftId',
      element: renderWithFallback(<CheckInSuccess />),
    },
    {
      path: 'create/:shiftId',
      element: renderWithFallback(<CreateVolunteer />),
    },
    {
      path: 'sign',
      children: [
        {
          path: 'success/:shiftId/:contactId',
          element: renderWithFallback(<SignSuccess />),
        },
        {
          path: ':doc/:shiftId/:contactId',
          element: renderWithFallback(<Sign />),
        },
        {
          path: ':shiftId/:contactId',
          element: renderWithFallback(<CheckInSign />),
        },
      ],
    },
  ],
};

export default volunteerCheckInRouter;
