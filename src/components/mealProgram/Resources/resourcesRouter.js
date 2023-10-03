import { lazy } from 'react';

import renderWithFallback from '../../reusable/loading/renderWithFallback';

const Resources = lazy(() => import('./Resources'));
const ResourcesHome = lazy(() => import('./ResourcesHome'));
const Invoicing = lazy(() => import('./Invoicing'));
const MealGuidelines = lazy(() => import('./MealGuidelines'));
const Packaging = lazy(() => import('./Packaging'));
const YouthGuidelines = lazy(() => import('./YouthGuidelines'));
const EncampmentGuidelines = lazy(() => import('./EncampmentGuidelines'));

const resourcesRouter = {
  path: 'resources',
  element: renderWithFallback(<Resources />),
  children: [
    { index: true, element: renderWithFallback(<ResourcesHome />) },
    {
      path: 'meal-guidelines',
      element: renderWithFallback(<MealGuidelines />),
      children: [
        {
          path: 'encampment',
          element: renderWithFallback(<EncampmentGuidelines />),
        },
        { path: 'youth', element: renderWithFallback(<YouthGuidelines />) },
      ],
    },
    { path: 'invoicing', element: renderWithFallback(<Invoicing />) },
    { path: 'packaging', element: renderWithFallback(<Packaging />) },
  ],
};

export default resourcesRouter;
