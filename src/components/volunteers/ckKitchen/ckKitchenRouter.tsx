import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

import renderWithFallback from '../../reusable/loading/renderWithFallback';
import JobList from '../JobList';

const KitchenCalendar = lazy(() => import('./KitchenCalendar'));
const KitchenSignupBase = lazy(() => import('./KitchenSignupBase'));

const ShiftSignup = lazy(() => import('../ShiftSignup'));
const KitchenHome = lazy(() => import('./KitchenHome'));

const Confirmation = lazy(() => import('../Confirmation'));
const GetVolunteer = lazy(() => import('../getVolunteer/GetVolunteer'));

const KitchenBase = lazy(() => import('./KitchenBase'));

const ckKitchenRouter: RouteObject = {
  path: 'ck-kitchen',
  element: renderWithFallback(<KitchenBase />),
  children: [
    { index: true, element: renderWithFallback(<KitchenHome />) },
    {
      path: 'signup-confirm/:campaignId/:hoursId/:contactId',
      element: renderWithFallback(<Confirmation />),
    },
    {
      path: 'signin/:campaignId',
      element: renderWithFallback(<GetVolunteer />),
    },
    {
      path: 'signup/:campaignId',
      element: renderWithFallback(<KitchenSignupBase />),
      children: [
        {
          index: true,
          element: renderWithFallback(<JobList />),
        },

        { path: 'cal', element: renderWithFallback(<KitchenCalendar />) },

        {
          path: ':shiftId',
          element: renderWithFallback(<ShiftSignup />),
        },
      ],
    },
  ],
};

export default ckKitchenRouter;
