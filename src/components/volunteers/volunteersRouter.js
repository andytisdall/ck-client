import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

import './Volunteers.css';
import renderWithFallback from '../reusable/renderWithFallback';

const VolunteersHome = lazy(() => import('./VolunteersHome'));
const KitchenBase = lazy(() => import('./KitchenBase'));
const SignupBase = lazy(() => import('./SignupBase'));
const KitchenList = lazy(() => import('./KitchenList'));
const ShiftSignup = lazy(() => import('./ShiftSignup'));
const KitchenHome = lazy(() => import('./KitchenHome'));
const GetVolunteer = lazy(() => import('./GetVolunteer'));
const KitchenCalendar = lazy(() => import('./KitchenCalendar'));

const VolunteersBase = () => {
  return (
    <div className="main volunteers">
      <h1 className="volunteers-main-header">CK Volunteers</h1>
      <Outlet />
    </div>
  );
};

const volunteersRouter = {
  path: 'volunteers',
  element: <VolunteersBase />,
  children: [
    { index: true, element: renderWithFallback(<VolunteersHome />) },
    {
      path: 'ck-kitchen',
      element: renderWithFallback(<KitchenBase />),
      children: [
        { index: true, element: renderWithFallback(<KitchenHome />) },
        { path: 'signup-confirmation' },
        {
          path: 'get-volunteer/:shiftId',
          element: renderWithFallback(<GetVolunteer />),
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
    },
  ],
};

export default volunteersRouter;
