import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import renderWithFallback from '../reusable/loading/renderWithFallback';
import './User.css';

const ChangePassword = lazy(() => import('./ChangePassword'));
const ChangeUsername = lazy(() => import('./ChangeUsername'));
const UserHome = lazy(() => import('./UserHome'));
const UserBase = lazy(() => import('./UserBase'));

const userRouter: RouteObject = {
  path: 'user',
  element: renderWithFallback(<UserBase />),
  children: [
    { index: true, element: renderWithFallback(<UserHome />) },
    {
      path: 'change-password',
      element: renderWithFallback(<ChangePassword />),
    },
    {
      path: 'change-username',
      element: renderWithFallback(<ChangeUsername />),
    },
  ],
};

export default userRouter;
