import { lazy } from 'react';

import renderWithFallback from '../../reusable/renderWithFallback';

const Schedule = lazy(() => import('./Schedule'));
const Calendar = lazy(() => import('./Calendar'));
const List = lazy(() => import('./List'));

const scheduleRouter = {
  path: 'schedule',
  element: renderWithFallback(<Schedule />),
  children: [
    {
      path: 'calendar',
      element: renderWithFallback(<Calendar />),
    },
    { path: ':detailId', element: renderWithFallback(<List />) },
    { path: 'list', element: renderWithFallback(<List />) },
  ],
};

export default scheduleRouter;
