import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

import renderWithFallback from '../../reusable/loading/renderWithFallback';

const SignupBase = lazy(() => import('./SignupBase'));

const ShiftSignup = lazy(() => import('./ShiftSignup'));
const KitchenHome = lazy(() => import('./KitchenHome'));

const Confirmation = lazy(() => import('./Confirmation'));
const GetVolunteer = lazy(() => import('../getVolunteer/GetVolunteer'));

const KitchenCalendar = lazy(() => import('./KitchenCalendar'));
const KitchenList = lazy(() => import('./KitchenList'));
const KitchenBase = lazy(() => import('./KitchenBase'));

const ckKitchenRouter: RouteObject = {
  path: 'ck-kitchen',
  element: renderWithFallback(<KitchenBase />),
  children: [
    { index: true, element: renderWithFallback(<KitchenHome />) },
    {
      path: 'signup-confirm/:campaignId/:hoursId/',
      element: renderWithFallback(<Confirmation />),
    },
    {
      path: 'signin',
      element: renderWithFallback(<GetVolunteer returnLink="../signup/list" />),
    },
    {
      path: 'signup',
      element: renderWithFallback(<SignupBase />),
      children: [
        { path: 'list', element: renderWithFallback(<KitchenList />) },
        {
          path: 'calendar',
          element: renderWithFallback(<KitchenCalendar />),
        },
        {
          path: ':shiftId',
          element: renderWithFallback(<ShiftSignup />),
        },
      ],
    },
  ],
};

export default ckKitchenRouter;
