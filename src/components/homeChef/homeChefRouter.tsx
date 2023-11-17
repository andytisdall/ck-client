import { lazy } from 'react';

import HomeChefBase from './HomeChefBase';
import './HomeChef.css';
import './Confirmation.css';
import renderWithFallback from '../reusable/loading/renderWithFallback';
import onboardingRouter from './onboarding/onboardingRouter';
import signupRouter from './shiftSignup/signupRouter';
import resourcesRouter from './resources/resourcesRouter';
import inviteRouter from './invite/inviteRouter';
import chefRouter from './chef/chefRouter';

const HomeChefHome = lazy(() => import('./HomeChefHome'));

const homeChefRouter = {
  path: 'home-chef',
  element: renderWithFallback(<HomeChefBase />),
  children: [
    { index: true, element: renderWithFallback(<HomeChefHome />) },
    onboardingRouter,
    inviteRouter,
    signupRouter,
    chefRouter,
    resourcesRouter,
  ],
};

export default homeChefRouter;
