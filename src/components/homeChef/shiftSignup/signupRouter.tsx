import { lazy } from 'react';

import renderWithFallback from '../../reusable/loading/renderWithFallback';

const ShiftSignup = lazy(() => import('./ShiftSignup'));
const VolunteerJobsList = lazy(() => import('./VolunteerJobsList'));
const VJobSingle = lazy(() => import('./VJobSingle'));
const Calendar = lazy(() => import('./HomeChefCalendar'));
const ShiftDetail = lazy(() => import('./ShiftDetail'));
const Confirmation = lazy(() => import('./Confirmation'));

const signupRouter = {
  path: 'signup',
  element: renderWithFallback(<ShiftSignup />),
  children: [
    { path: 'list', element: renderWithFallback(<VolunteerJobsList />) },
    { path: 'fridge/:jobId', element: renderWithFallback(<VJobSingle />) },
    { path: 'calendar', element: renderWithFallback(<Calendar />) },
    {
      path: 'shift/:shiftId',
      element: renderWithFallback(<ShiftDetail />),
    },
    {
      path: 'confirm/:hoursId',
      element: renderWithFallback(<Confirmation />),
    },
  ],
};

export default signupRouter;
