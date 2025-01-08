import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import renderWithFallback from '../../reusable/loading/renderWithFallback';

//home chef onboarding
const HomeChefOnboarding = lazy(() => import('./HomeChefOnboarding'));
const UploadFoodHandler = lazy(() => import('./UploadFoodHandler'));
const OrientationVideo = lazy(() => import('./OrientationVideo'));

// documents
const FileSuccess = lazy(() => import('../../reusable/file/FileSuccess'));

// quiz
const Quiz = lazy(() => import('./quiz/Quiz'));
const QuizResults = lazy(() => import('./quiz/QuizResults'));

const Sign = lazy(() => import('../../reusable/signature/Sign'));
const SignSuccess = lazy(() => import('../../reusable/signature/SignSuccess'));

const onboardingRouter: RouteObject = {
  path: 'onboarding',
  children: [
    { index: true, element: renderWithFallback(<HomeChefOnboarding />) },
    {
      path: 'quiz',
      element: renderWithFallback(<Quiz />),
    },
    {
      path: 'quiz-results',
      element: renderWithFallback(<QuizResults />),
    },
    {
      path: 'orientation-video',
      element: renderWithFallback(<OrientationVideo />),
    },

    {
      path: 'upload-food-handler',
      element: renderWithFallback(<UploadFoodHandler />),
    },
    {
      path: 'file-success/:filesUploaded',
      element: renderWithFallback(
        <FileSuccess returnLink="/home-chef/onboarding" />
      ),
    },
    {
      path: 'sign',
      children: [
        {
          path: 'success/:email',
          element: renderWithFallback(
            <SignSuccess returnLink="/home-chef/onboarding" />
          ),
        },
        {
          path: ':doc',
          element: renderWithFallback(<Sign />),
        },
      ],
    },
  ],
};

export default onboardingRouter;
