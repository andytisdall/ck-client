import { lazy } from 'react';

import renderWithFallback from '../reusable/renderWithFallback';
import './MealProgram.css';

import onboardingRouter from '../homeChef/onboarding/onboardingRouter';
import resourcesRouter from './resources/resourcesRouter';
import scheduleRouter from './schedule/scheduleRouter';

const MealProgramBase = lazy(() => import('./MealProgramBase'));
const MealProgramHome = lazy(() => import('./MealProgramHome'));

const mealProgramRouter = {
  path: 'meal-program',
  element: renderWithFallback(<MealProgramBase />),
  children: [
    { index: true, element: renderWithFallback(<MealProgramHome />) },
    onboardingRouter,
    scheduleRouter,
    resourcesRouter,
  ],
};

export default mealProgramRouter;
