import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import renderWithFallback from '../../reusable/loading/renderWithFallback';

const ChefShifts = lazy(() => import('./ChefShifts'));
const EditShift = lazy(() => import('./EditShift'));

const chefRouter: RouteObject = {
  path: 'chef',
  children: [
    { index: true, element: renderWithFallback(<ChefShifts />) },
    { path: 'edit-shift/:id', element: renderWithFallback(<EditShift />) },
  ],
};

export default chefRouter;
