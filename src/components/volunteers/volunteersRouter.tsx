import { lazy } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import './Volunteers.css';
import renderWithFallback from '../reusable/loading/renderWithFallback';

const VolunteersHome = lazy(() => import('./VolunteersHome'));
const SignupBase = lazy(() => import('./ckKitchen/SignupBase'));
const KitchenList = lazy(() => import('./ckKitchen/KitchenList'));
const ShiftSignup = lazy(() => import('./ckKitchen/ShiftSignup'));
const KitchenHome = lazy(() => import('./ckKitchen/KitchenHome'));
const KitchenCalendar = lazy(() => import('./ckKitchen/KitchenCalendar'));
const Confirmation = lazy(() => import('./ckKitchen/Confirmation'));
const GetVolunteer = lazy(() => import('./GetVolunteer'));

const VolunteersBase = () => {
  return (
    <div className="main volunteers">
      <h1 className="volunteers-main-header">CK Volunteers</h1>
      <Outlet />
    </div>
  );
};

const volunteersRouter: RouteObject = {
  path: 'volunteers',
  element: <VolunteersBase />,
  children: [
    { index: true, element: renderWithFallback(<VolunteersHome />) },
    {
      path: 'ck-kitchen',
      children: [
        { index: true, element: renderWithFallback(<KitchenHome />) },
        {
          path: 'signup-confirm/:hoursId',
          element: renderWithFallback(<Confirmation />),
        },
        {
          path: 'signin/:shiftId',
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
