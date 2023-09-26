import { lazy } from 'react';

import renderWithFallback from '../../reusable/renderWithFallback';

const VolunteerEvent = lazy(() => import('./VolunteerEvent'));
const JobList = lazy(() => import('./JobList'));
const EventShiftSignup = lazy(() => import('./Signup'));
const EventShiftConfirmation = lazy(() => import('./Confirmation'));

const eventsRouter = {
  path: 'events',
  children: [
    {
      path: 'signup/:id',
      element: renderWithFallback(<VolunteerEvent />),
      children: [
        { index: true, element: renderWithFallback(<JobList />) },
        {
          path: ':shiftId',
          element: renderWithFallback(<EventShiftSignup />),
        },
      ],
    },
    {
      path: 'signup-confirm/:hoursId',
      element: renderWithFallback(<EventShiftConfirmation />),
    },
  ],
};

export default eventsRouter;