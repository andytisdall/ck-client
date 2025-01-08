import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import renderWithFallback from '../reusable/loading/renderWithFallback';

const CheckInVolunteerBase = lazy(() => import('./CheckInVolunteerBase'));
const KitchenCheckIn = lazy(() => import('./CheckInKitchenVolunteers'));
const CheckInConfirm = lazy(() => import('./CheckInConfirm'));
const CheckInSuccess = lazy(() => import('./CheckInSuccess'));
const CheckInHome = lazy(() => import('./CheckInHome'));

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
      path: 'kitchen/:shiftId',
      element: renderWithFallback(<KitchenCheckIn />),
    },
    {
      path: 'confirm/:shiftId/:contactId',
      element: renderWithFallback(<CheckInConfirm />),
    },
    { path: 'success', element: renderWithFallback(<CheckInSuccess />) },
    {
      path: 'sign',
      children: [
        {
          path: 'success/:contactId',
          element: renderWithFallback(<SignSuccess />),
        },
        {
          path: ':doc/:contactId',
          element: renderWithFallback(<Sign />),
        },
        { path: ':contactId', element: renderWithFallback(<CheckInSign />) },
      ],
    },
  ],
};

export default volunteerCheckInRouter;
