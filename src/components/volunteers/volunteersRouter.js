import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

import './Volunteers.css';
import renderWithFallback from '../reusable/renderWithFallback';

const VolunteersHome = lazy(() => import('./VolunteersHome'));
// const VolunteerSignIn = lazy(() => import('./VolunteerSignIn'));
const KitchenHome = lazy(() => import('./KitchenHome'));
const Signup = lazy(() => import('./Signup'));
const KitchenBase = lazy(() => import('./KitchenBase'));

const Volunteers = () => {
  return (
    <div className="main volunteers">
      <h1>CK Volunteers</h1>
      <Outlet />
    </div>
  );
};

const volunteersRouter = {
  path: 'volunteers',
  element: <Volunteers />,
  children: [
    { index: true, element: renderWithFallback(<VolunteersHome />) },
    {
      path: 'ck-kitchen',
      element: renderWithFallback(<KitchenBase />),
      children: [
        { index: true, element: renderWithFallback(<KitchenHome />) },
        {
          path: ':shiftId',
          element: renderWithFallback(<Signup />),
        },
      ],
    },
  ],
};

export default volunteersRouter;
