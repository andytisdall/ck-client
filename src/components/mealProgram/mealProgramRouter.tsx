import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import renderWithFallback from '../reusable/loading/renderWithFallback';
import './MealProgram.css';

import onboardingRouter from './onboarding/onboardingRouter';
import resourcesRouter from './resources/resourcesRouter';
import scheduleRouter from './schedule/scheduleRouter';

const MealProgramBase = lazy(() => import('./MealProgramBase'));
const MealProgramHome = lazy(() => import('./MealProgramHome'));

const mealProgramRouter: RouteObject = {
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
