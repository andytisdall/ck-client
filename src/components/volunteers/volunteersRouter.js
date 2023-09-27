import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

import './Volunteers.css';
import renderWithFallback from '../reusable/renderWithFallback';

const VolunteersHome = lazy(() => import('./VolunteersHome'));
// const VolunteerSignIn = lazy(() => import('./VolunteerSignIn'));
const KitchenHome = lazy(() => import('./KitchenHome'));

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
    { path: 'ck-kitchen', element: renderWithFallback(<KitchenHome />) },
  ],
};

export default volunteersRouter;
