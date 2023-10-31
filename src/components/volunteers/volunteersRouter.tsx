import { lazy } from 'react';
import { Outlet, RouteObject, Link } from 'react-router-dom';

import './Volunteers.css';
import renderWithFallback from '../reusable/loading/renderWithFallback';

const VolunteersHome = lazy(() => import('./VolunteersHome'));
const SignupBase = lazy(() => import('./ckKitchen/SignupBase'));

const ShiftSignup = lazy(() => import('./ckKitchen/ShiftSignup'));
const KitchenHome = lazy(() => import('./ckKitchen/KitchenHome'));

const Confirmation = lazy(() => import('./ckKitchen/Confirmation'));
const GetVolunteer = lazy(() => import('./getVolunteer/GetVolunteer'));
const DocusignSign = lazy(() => import('../reusable/docusign/DocusignSign'));
const DocusignSuccess = lazy(
  () => import('../reusable/docusign/DocusignSuccess')
);
const KitchenCalendar = lazy(() => import('./ckKitchen/KitchenCalendar'));
const KitchenList = lazy(() => import('./ckKitchen/KitchenList'));

const VolunteersBase = () => {
  return (
    <div className="main volunteers">
      <Link to="/volunteers">
        <h1 className="volunteers-main-header">CK Volunteers</h1>
      </Link>
      <div className="volunteers-body">
        {' '}
        <Outlet />
      </div>
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
          path: 'signup-confirm/:hoursId/',
          element: renderWithFallback(<Confirmation />),
        },
        {
          path: 'signup-confirm/:hoursId/:contactId',
          element: renderWithFallback(<Confirmation />),
        },
        {
          path: 'signin',
          element: renderWithFallback(<GetVolunteer />),
        },
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
              element: renderWithFallback(
                <DocusignSuccess returnLink="../../signup/list" />
              ),
            },
          ],
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
              path: 'shift/:shiftId',
              element: renderWithFallback(<ShiftSignup />),
            },
          ],
        },
      ],
    },
  ],
};

export default volunteersRouter;
