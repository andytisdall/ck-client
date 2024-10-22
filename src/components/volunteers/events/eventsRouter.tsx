import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import renderWithFallback from '../../reusable/loading/renderWithFallback';

const EventSignupBase = lazy(() => import('./EventSignupBase'));
const JobList = lazy(() => import('../JobList'));
const ShiftSignup = lazy(() => import('../ShiftSignup'));
const Confirmation = lazy(() => import('../Confirmation'));
const GetVolunteer = lazy(() => import('../getVolunteer/GetVolunteer'));

const eventsRouter: RouteObject = {
  path: 'events',
  children: [
    {
      path: 'signin/:campaignId',
      element: renderWithFallback(<GetVolunteer />),
    },
    {
      path: 'signup/:campaignId',
      element: renderWithFallback(<EventSignupBase />),
      children: [
        { index: true, element: renderWithFallback(<JobList />) },

        {
          path: ':shiftId',
          element: renderWithFallback(<ShiftSignup />),
        },
      ],
    },
    {
      path: 'signup-confirm/:campaignId/:hoursId/:contactId',
      element: renderWithFallback(<Confirmation />),
    },
  ],
};

export default eventsRouter;
