import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import renderWithFallback from '../../reusable/loading/renderWithFallback';

const Invite = lazy(() => import('./Invite'));
const InviteSent = lazy(() => import('./InviteSent'));

const inviteRouter: RouteObject = {
  path: 'invite',
  children: [
    { index: true, element: renderWithFallback(<Invite />) },
    { path: 'sent', element: renderWithFallback(<InviteSent />) },
  ],
};

export default inviteRouter;
