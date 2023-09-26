import React from 'react';
import { Outlet } from 'react-router-dom';

import './Volunteers.css';
import renderWithFallback from '../reusable/renderWithFallback';

const VolunteersHome = React.lazy(() => import('./VolunteersHome'));
const VolunteerSignIn = React.lazy(() => import('./VolunteerSignIn'));

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
    { path: 'ck-kitchen', element: renderWithFallback(<VolunteerSignIn />) },
  ],
};

export default volunteersRouter;
