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
import ShiftDetail from './shiftSignup/ShiftDetail';
// home chef resources
import Resources from './resources/Resources';
import ResourcesList from './resources/ResourcesList';
import RecipeList from './resources/recipes/RecipeList';
import Recipe from './resources/recipes/Recipe';
import CreateRecipe from './resources/recipes/CreateRecipe';
// documents
import FileSuccess from '../reusable/FileSuccess';
import DSLogin from '../reusable/DSLogin';
import DocusignSign from '../reusable/DocusignSign';
import DocusignSuccess from '../reusable/DocusignSuccess';

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
        { path: 'shift/:shiftId', element: <ShiftDetail /> },
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
            { path: 'add-recipe', element: <CreateRecipe /> },
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
              element: <DocusignSign accountType="contact" />,
            },
            {
              path: 'login',
              element: <DSLogin accountType="contact" />,
            },
            {
              path: 'success',
              element: <DocusignSuccess accountType="contact" />,
            },
          ],
        },
      ],
    },
  ],
};

export default homeChefRouter;
