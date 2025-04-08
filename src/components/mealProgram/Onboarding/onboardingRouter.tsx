import { lazy } from "react";

import renderWithFallback from "../../reusable/loading/renderWithFallback";

const Onboarding = lazy(() => import("./Onboarding"));
const OnboardingHome = lazy(() => import("./OnboardingHome"));
const UploadDocuments = lazy(() => import("./UploadDocuments"));
const FileSuccess = lazy(() => import("../../reusable/file/FileSuccess"));

const onboardingRouter = {
  path: "onboarding",
  element: renderWithFallback(<Onboarding />),
  children: [
    { index: true, element: renderWithFallback(<OnboardingHome />) },
    {
      path: "upload-documents",
      element: renderWithFallback(<UploadDocuments />),
    },

    {
      path: "file-success/:filesUploaded",
      element: renderWithFallback(
        <FileSuccess returnLink="/meal-program/onboarding" />
      ),
    },
  ],
};

export default onboardingRouter;
