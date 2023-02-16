import { connect } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getUserInfo } from '../../actions';
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
import ChefShifts from './chef/ChefShifts';
import EditShift from './chef/EditShift';
// home chef resources
import Resources from './resources/Resources';
import ResourcesList from './resources/ResourcesList';
import RecipeList from './resources/recipes/RecipeList';
import Recipe from './resources/recipes/Recipe';
import CreateRecipe from './resources/recipes/CreateRecipe';
// documents
import FileSuccess from '../reusable/FileSuccess';
import DocusignSign from '../reusable/DocusignSign';
import DocusignSuccess from '../reusable/DocusignSuccess';

import Loading from '../reusable/Loading';

const HomeChef = ({ user, getUserInfo, error }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && !user.homeChefStatus) {
      getUserInfo();
      setLoading(true);
    }
  }, [getUserInfo, user]);

  useEffect(() => {
    if (user?.firstName || error) {
      setLoading(false);
    }
  }, [user, error]);

  const renderSignIn = () => {
    return <h3>Sign in to access this page.</h3>;
  };

  const renderNoChef = () => {
    if (!loading) {
      return (
        <div>
          <h3>You must be a CK Home Chef to access this page.</h3>
          <h3>
            To get started,{' '}
            <Link to="/forms/home-chef" className="retro-link">
              please complete the signup form.
            </Link>
          </h3>
        </div>
      );
    }
  };

  return (
    <div className="main home-chef">
      <Link to="/home-chef">
        <h1 className="page-header">Home Chef</h1>
      </Link>
      {loading && <Loading />}
      {!user && renderSignIn()}
      {user && user.homeChefStatus ? <Outlet /> : renderNoChef()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.user, error: state.error.error };
};

const ConnectedHomeChef = connect(mapStateToProps, { getUserInfo })(HomeChef);

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
      path: 'chef',
      children: [
        { index: true, element: <ChefShifts /> },
        { path: 'edit-shift/:id', element: <EditShift /> },
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
        {
          path: 'file-success',
          element: <FileSuccess returnLink="/home-chef" />,
        },
        {
          path: 'docusign',
          children: [
            {
              path: 'sign',
              element: <DocusignSign accountType="contact" />,
            },
            {
              path: 'success',
              element: (
                <DocusignSuccess
                  accountType="contact"
                  returnLink="/home-chef"
                />
              ),
            },
          ],
        },
      ],
    },
  ],
};

export default homeChefRouter;
