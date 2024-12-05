import { lazy } from 'react';

import renderWithFallback from '../../reusable/loading/renderWithFallback';

const Onboarding = lazy(() => import('./Onboarding'));
const OnboardingHome = lazy(() => import('./OnboardingHome'));
const UploadDocuments = lazy(() => import('./UploadDocuments'));
const FileSuccess = lazy(() => import('../../reusable/file/FileSuccess'));
const DocusignSign = lazy(() => import('../../reusable/docusign/DocusignSign'));
const DocusignSuccess = lazy(
  () => import('../../reusable/docusign/DocusignSuccess')
);
const SignDocumentsHome = lazy(() => import('./SignDocumentsHome'));

const onboardingRouter = {
  path: 'onboarding',
  element: renderWithFallback(<Onboarding />),
  children: [
    { index: true, element: renderWithFallback(<OnboardingHome />) },
    {
      path: 'upload-documents',
      element: renderWithFallback(<UploadDocuments />),
    },
    // {
    //   path: 'sign-documents',
    //   children: [
    //     { index: true, element: renderWithFallback(<SignDocumentsHome />) },
    //     {
    //       path: 'sign/:doc',
    //       element: renderWithFallback(<DocusignSign />),
    //     },
    //     {
    //       path: 'success',
    //       element: renderWithFallback(
    //         <DocusignSuccess returnLink="/meal-program/onboarding" />
    //       ),
    //     },
    //   ],
    // },
    {
      path: 'file-success/:filesUploaded',
      element: renderWithFallback(
        <FileSuccess returnLink="/meal-program/onboarding" />
      ),
    },
  ],
};

export default onboardingRouter;
