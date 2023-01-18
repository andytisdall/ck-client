import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';

import './HomeChef.css';
import HomeChefHome from './HomeChefHome';
//home chef onboarding
import HomeChefOnboarding from './onboarding/HomeChefOnboarding';
import HomeChefDocuments from './onboarding/HomeChefDocuments';
import UploadFoodHandler from './onboarding/UploadFoodHandler';
// home chef shift sign up
import ShiftSignup from './shiftSignup/ShiftSignup';
import VolunteerJobsList from './shiftSignup/VolunteerJobsList';
import Calendar from './shiftSignup/Calendar';
import VJobSingle from './shiftSignup/VJobSingle';
// home chef resources
import Resources from './resources/Resources';
import ResourcesList from './resources/ResourcesList';
import RecipeList from './resources/recipes/RecipeList';
import Recipe from './resources/recipes/Recipe';
// documents
import FileSuccess from '../documents/FileSuccess';
import DSLogin from '../documents/DSLogin';
import DocusignSign from '../documents/DocusignSign';
import DocusignSuccess from '../documents/DocusignSuccess';

const OnboardingHome = ({ user }) => {
  const renderSignIn = () => {
    return <h3>Sign in to access this page.</h3>;
  };

  return (
    <div className="main home-chef">
      <h1 className="page-header">Home Chef</h1>
      {user && <Outlet />}
      {!user && renderSignIn()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.user };
};

const ConnectedHomeChef = connect(mapStateToProps)(OnboardingHome);

const homeChefRouter = {
  path: 'home-chef',
  element: <ConnectedHomeChef />,
  children: [
    { index: true, element: <HomeChefHome /> },
    {
      path: 'signup',
      element: <ShiftSignup />,
      children: [
        { path: 'list', element: <VolunteerJobsList /> },
        { path: 'fridge/:jobId', element: <VJobSingle /> },
        { path: 'calendar', element: <Calendar /> },
      ],
    },
    {
      path: 'resources',
      element: <Resources />,
      children: [
        { index: true, element: <ResourcesList /> },
        {
          path: 'recipes',
          children: [
            { index: true, element: <RecipeList /> },
            { path: ':recipeId', element: <Recipe /> },
          ],
        },
      ],
    },
    {
      path: 'onboarding',
      children: [
        { index: true, element: <HomeChefOnboarding /> },
        {
          path: 'documents',
          element: <HomeChefDocuments />,
        },
        {
          path: 'upload-food-handler',
          element: <UploadFoodHandler />,
        },
        { path: 'file-success', element: <FileSuccess /> },
        {
          path: 'docusign',
          children: [
            {
              path: 'sign',
              element: <DocusignSign accountType="contact" docCode="HC" />,
            },
            {
              path: 'login',
              element: <DSLogin accountType="contact" />,
            },
            {
              path: 'success',
              element: <DocusignSuccess accountType="contact" docCode="HC" />,
            },
          ],
        },
      ],
    },
  ],
};

export default homeChefRouter;
