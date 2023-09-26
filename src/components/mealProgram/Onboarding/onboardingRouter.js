import { lazy } from 'react';

import renderWithFallback from '../../reusable/renderWithFallback';

const Onboarding = lazy(() => import('./Onboarding/Onboarding'));
const OnboardingHome = lazy(() => import('./Onboarding/OnboardingHome'));
const UploadDocuments = lazy(() => import('./Onboarding/UploadDocuments'));
const SignDocuments = lazy(() => import('./Onboarding/SignDocuments'));
const FileSuccess = lazy(() => import('../reusable/FileSuccess'));
const DocusignSign = lazy(() => import('../reusable/DocusignSign'));
const DocusignSuccess = lazy(() => import('../reusable/DocusignSuccess'));
const SignDocumentsHome = lazy(() => import('./Onboarding/SignDocumentsHome'));

const onboardingRouter = {
  path: 'onboarding',
  element: renderWithFallback(<Onboarding />),
  children: [
    { index: true, element: renderWithFallback(<OnboardingHome />) },
    {
      path: 'upload-documents',
      element: renderWithFallback(<UploadDocuments />),
    },
    {
      path: 'sign-documents',
      element: renderWithFallback(<SignDocuments />),
      children: [
        { index: true, element: renderWithFallback(<SignDocumentsHome />) },
        {
          path: 'sign/:doc',
          element: renderWithFallback(<DocusignSign />),
        },
        {
          path: 'success',
          element: renderWithFallback(
            <DocusignSuccess returnLink="/meal-program/onboarding" />
          ),
        },
      ],
    },
    {
      path: 'file-success',
      element: renderWithFallback(
        <FileSuccess returnLink="/meal-program/onboarding" />
      ),
    },
  ],
};

export default onboardingRouter;
