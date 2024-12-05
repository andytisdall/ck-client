import { lazy } from 'react';
import { Outlet, RouteObject, Link } from 'react-router-dom';

import './Volunteers.css';
import renderWithFallback from '../reusable/loading/renderWithFallback';
import eventsRouter from './events/eventsRouter';
import ckKitchenRouter from './ckKitchen/ckKitchenRouter';

const Sign = lazy(() => import('../reusable/signature/Sign'));
const SignSuccess = lazy(() => import('../reusable/signature/SignSuccess'));

const VolunteersHome = lazy(() => import('./VolunteersHome'));
// const DocusignSign = lazy(() => import('../reusable/docusign/DocusignSign'));
// const DocusignSuccess = lazy(
//   () => import('../reusable/docusign/DocusignSuccess')
// );

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
    eventsRouter,
    ckKitchenRouter,
    // {
    //   path: 'sign',
    //   children: [
    //     {
    //       path: ':doc',
    //       element: renderWithFallback(<DocusignSign />),
    //     },
    //     {
    //       path: ':doc/:id',
    //       element: renderWithFallback(<DocusignSign />),
    //     },
    //     {
    //       path: 'success',
    //       element: renderWithFallback(<DocusignSuccess returnLink="../.." />),
    //     },
    //   ],
    // },
    {
      path: 'sign',
      children: [
        {
          path: 'success/:email',
          element: renderWithFallback(<SignSuccess returnLink="../.." />),
        },
        {
          path: ':doc',
          element: renderWithFallback(<Sign />),
        },
        {
          path: ':doc/:contactId',
          element: renderWithFallback(<Sign />),
        },
      ],
    },
  ],
};

export default volunteersRouter;
