import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import renderWithFallback from '../../reusable/loading/renderWithFallback';

//home chef onboarding
const HomeChefOnboarding = lazy(() => import('./HomeChefOnboarding'));
const UploadFoodHandler = lazy(() => import('./UploadFoodHandler'));
const OrientationVideo = lazy(() => import('./OrientationVideo'));
const OrientationSlides = lazy(() => import('./OrientationSlides'));

// documents
const FileSuccess = lazy(() => import('../../reusable/file/FileSuccess'));
const DocusignSign = lazy(() => import('../../reusable/docusign/DocusignSign'));
const DocusignSuccess = lazy(
  () => import('../../reusable/docusign/DocusignSuccess')
);

// quiz
const Quiz = lazy(() => import('./quiz/Quiz'));
const QuizResults = lazy(() => import('./quiz/QuizResults'));

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
      path: 'orientation-slides',
      element: renderWithFallback(<OrientationSlides />),
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
      path: 'docusign',
      children: [
        {
          path: 'sign/:doc',
          element: renderWithFallback(<DocusignSign />),
        },
        {
          path: 'success',
          element: renderWithFallback(
            <DocusignSuccess returnLink="/home-chef/onboarding" />
          ),
        },
      ],
    },
  ],
};

export default onboardingRouter;
