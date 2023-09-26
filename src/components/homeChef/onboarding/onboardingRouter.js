import { lazy } from 'react';

import renderWithFallback from '../../reusable/renderWithFallback';

//home chef onboarding
const HomeChefOnboarding = lazy(() => import('./HomeChefOnboarding'));
const HomeChefDocuments = lazy(() => import('./HomeChefDocuments'));
const UploadFoodHandler = lazy(() => import('./UploadFoodHandler'));
const OrientationVideo = lazy(() => import('./OrientationVideo'));
const OrientationSlides = lazy(() => import('./OrientationSlides'));

// documents
const FileSuccess = lazy(() => import('../../reusable/FileSuccess'));
const DocusignSign = lazy(() => import('../../reusable/DocusignSign'));
const DocusignSuccess = lazy(() => import('../../reusable/DocusignSuccess'));

const onboardingRouter = {
  path: 'onboarding',
  children: [
    { index: true, element: renderWithFallback(<HomeChefOnboarding />) },
    {
      path: 'orientation-video',
      element: renderWithFallback(<OrientationVideo />),
    },
    {
      path: 'orientation-slides',
      element: renderWithFallback(<OrientationSlides />),
    },
    {
      path: 'documents',
      element: renderWithFallback(<HomeChefDocuments />),
    },
    {
      path: 'upload-food-handler',
      element: renderWithFallback(<UploadFoodHandler />),
    },
    {
      path: 'file-success',
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
            <DocusignSuccess
              accountType="contact"
              returnLink="/home-chef/onboarding"
            />
          ),
        },
      ],
    },
  ],
};

export default onboardingRouter;
