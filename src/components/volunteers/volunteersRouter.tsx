import { lazy } from 'react';
import { Outlet, RouteObject, Link } from 'react-router-dom';

import './Volunteers.css';
import renderWithFallback from '../reusable/loading/renderWithFallback';
import eventsRouter from './events/eventsRouter';
import ckKitchenRouter from './ckKitchen/ckKitchenRouter';

const DocusignSign = lazy(() => import('../reusable/docusign/DocusignSign'));
const DocusignSuccess = lazy(
  () => import('../reusable/docusign/DocusignSuccess')
);
const VolunteersHome = lazy(() => import('./VolunteersHome'));
const IntakeBase = lazy(() => import('./intake/IntakeBase'));

const VolunteersBase = () => {
  return (
    <div className="main volunteers">
      <Link to="/volunteers">
        <h1 className="volunteers-main-header">CK Volunteers</h1>
      </Link>
      <Outlet />
    </div>
  );
};

const volunteersRouter: RouteObject = {
  path: 'volunteers',
  element: <VolunteersBase />,
  children: [
    { index: true, element: renderWithFallback(<VolunteersHome />) },
    // { path: 'get-started', element: renderWithFallback(<IntakeBase />) },
    eventsRouter,
    ckKitchenRouter,
    {
      path: 'docusign',
      children: [
        {
          path: 'sign/:doc',
          element: renderWithFallback(<DocusignSign />),
        },
        {
          path: 'sign/:doc/:id',
          element: renderWithFallback(<DocusignSign />),
        },
        {
          path: 'success',
          element: renderWithFallback(<DocusignSuccess returnLink="../.." />),
        },
      ],
    },
  ],
};

export default volunteersRouter;
