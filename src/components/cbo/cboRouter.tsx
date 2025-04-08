import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

import './cbo.css';
import renderWithFallback from '../reusable/loading/renderWithFallback';

const CBO = lazy(() => import('./CBO'));

const cboRouter: RouteObject = {
  path: 'cbo',
  element: renderWithFallback(<CBO />),
};

export default cboRouter;
