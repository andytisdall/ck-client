import { lazy } from 'react';

import renderWithFallback from '../../reusable/renderWithFallback';

const Invite = lazy(() => import('./Invite'));
const InviteSent = lazy(() => import('./InviteSent'));

const inviteRouter = {
  path: 'invite',
  children: [
    { index: true, element: renderWithFallback(<Invite />) },
    { path: 'sent', element: renderWithFallback(<InviteSent />) },
  ],
};

export default inviteRouter;
