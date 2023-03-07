import { connect } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { getUserInfo } from '../../actions';
import './HomeChef.css';
import Loading from '../reusable/Loading';
import renderWithFallback from '../reusable/renderWithFallback';

const HomeChefStatus = React.lazy(() => import('./HomeChefStatus'));

const HomeChefHome = React.lazy(() => import('./HomeChefHome'));
//home chef onboarding
const HomeChefOnboarding = React.lazy(() =>
  import('./onboarding/HomeChefOnboarding')
);
const HomeChefDocuments = React.lazy(() =>
  import('./onboarding/HomeChefDocuments')
);
const UploadFoodHandler = React.lazy(() =>
  import('./onboarding/UploadFoodHandler')
);
// home chef shift sign up
const ShiftSignup = React.lazy(() => import('./shiftSignup/ShiftSignup'));
const VolunteerJobsList = React.lazy(() =>
  import('./shiftSignup/VolunteerJobsList')
);
const Calendar = React.lazy(() => import('./shiftSignup/Calendar'));
const VJobSingle = React.lazy(() => import('./shiftSignup/VJobSingle'));
const ShiftDetail = React.lazy(() => import('./shiftSignup/ShiftDetail'));
const ChefShifts = React.lazy(() => import('./chef/ChefShifts'));
const EditShift = React.lazy(() => import('./chef/EditShift'));
// home chef resources
const Resources = React.lazy(() => import('./resources/Resources'));
const ResourcesList = React.lazy(() => import('./resources/ResourcesList'));
const RecipeList = React.lazy(() => import('./resources/recipes/RecipeList'));
const Recipe = React.lazy(() => import('./resources/recipes/Recipe'));
const CreateRecipe = React.lazy(() =>
  import('./resources/recipes/CreateRecipe')
);
const FridgeMap = React.lazy(() => import('./resources/FridgeMap'));
// documents
const FileSuccess = React.lazy(() => import('../reusable/FileSuccess'));
const DocusignSign = React.lazy(() => import('../reusable/DocusignSign'));
const DocusignSuccess = React.lazy(() => import('../reusable/DocusignSuccess'));

const Invite = React.lazy(() => import('./Invite'));

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

  const renderHomeChef = () => {
    if (user.homeChefStatus) {
      return (
        <>
          <HomeChefStatus />
          <Outlet />
        </>
      );
    } else {
      renderNoChef();
    }
  };

  return (
    <div className="main home-chef">
      <Link to="/home-chef">
        <h1 className="page-header">Home Chef</h1>
      </Link>
      {loading && <Loading />}
      {!user && renderSignIn()}
      {!!user && renderHomeChef()}
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
    { index: true, element: renderWithFallback(<HomeChefHome />) },
    { path: 'invite', element: renderWithFallback(Invite) },
    {
      path: 'signup',
      element: renderWithFallback(<ShiftSignup />),
      children: [
        { path: 'list', element: renderWithFallback(<VolunteerJobsList />) },
        { path: 'fridge/:jobId', element: renderWithFallback(<VJobSingle />) },
        { path: 'calendar', element: renderWithFallback(<Calendar />) },
        {
          path: 'shift/:shiftId',
          element: renderWithFallback(<ShiftDetail />),
        },
      ],
    },
    {
      path: 'chef',
      children: [
        { index: true, element: renderWithFallback(<ChefShifts />) },
        { path: 'edit-shift/:id', element: renderWithFallback(<EditShift />) },
      ],
    },
    {
      path: 'resources',
      element: renderWithFallback(<Resources />),
      children: [
        { index: true, element: renderWithFallback(<ResourcesList />) },
        { path: 'map', element: renderWithFallback(<FridgeMap />) },
        {
          path: 'recipes',
          children: [
            { index: true, element: renderWithFallback(<RecipeList />) },
            { path: ':recipeId', element: renderWithFallback(<Recipe />) },
            {
              path: 'add-recipe',
              element: renderWithFallback(<CreateRecipe />),
            },
          ],
        },
      ],
    },
    {
      path: 'onboarding',
      children: [
        { index: true, element: renderWithFallback(<HomeChefOnboarding />) },
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
          element: renderWithFallback(<FileSuccess returnLink="/home-chef" />),
        },
        {
          path: 'docusign',
          children: [
            {
              path: 'sign',
              element: renderWithFallback(
                <DocusignSign accountType="contact" />
              ),
            },
            {
              path: 'success',
              element: renderWithFallback(
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
