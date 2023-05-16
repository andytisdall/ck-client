import { connect } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import * as actions from '../../actions';
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
const OrientationVideo = React.lazy(() =>
  import('./onboarding/OrientationVideo')
);
const OrientationSlides = React.lazy(() =>
  import('./onboarding/OrientationSlides')
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
const Confirmation = React.lazy(() => import('./shiftSignup/Confirmation'));
// home chef resources
const Resources = React.lazy(() => import('./resources/Resources'));
const ResourcesList = React.lazy(() => import('./resources/ResourcesList'));
const RecipeList = React.lazy(() => import('./resources/recipes/RecipeList'));
const Recipe = React.lazy(() => import('./resources/recipes/Recipe'));
const CreateRecipe = React.lazy(() =>
  import('./resources/recipes/CreateRecipe')
);
// documents
const FileSuccess = React.lazy(() => import('../reusable/FileSuccess'));
const DocusignSign = React.lazy(() => import('../reusable/DocusignSign'));
const DocusignSuccess = React.lazy(() => import('../reusable/DocusignSuccess'));

const Invite = React.lazy(() => import('./invite/Invite'));
const InviteSent = React.lazy(() => import('./invite/InviteSent'));

const FeedTheHood = React.lazy(() => import('./events/FeedTheHood'));
const EventShiftSignup = React.lazy(() => import('./events/Signup'));
const JobList = React.lazy(() => import('./events/JobList'));
const EventShiftConfirmation = React.lazy(() =>
  import('./events/Confirmation')
);

const HomeChef = ({ user, getUserInfo, error, getCampaign }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && !user.firstName) {
      getUserInfo();
      getCampaign();
      setLoading(true);
    }
  }, [getUserInfo, user, getCampaign]);

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
          {user.homeChefStatus !== 'Active' &&
            renderWithFallback(<HomeChefStatus />)}
          <Outlet />
        </>
      );
    } else {
      return renderNoChef();
    }
  };

  return (
    <div className="main home-chef">
      <Link to="/home-chef">
        <img
          src="/images/home-chef/home-chef-header.png"
          className="home-chef-header"
          alt="home chef header"
        />
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

const ConnectedHomeChef = connect(mapStateToProps, actions)(HomeChef);

const homeChefRouter = {
  path: 'home-chef',
  element: <ConnectedHomeChef />,
  children: [
    { index: true, element: renderWithFallback(<HomeChefHome />) },
    {
      path: 'invite',
      children: [
        { index: true, element: renderWithFallback(<Invite />) },
        { path: 'sent', element: renderWithFallback(<InviteSent />) },
      ],
    },
    {
      path: 'events',
      children: [
        {
          path: 'feed-the-hood',
          element: renderWithFallback(<FeedTheHood />),
          children: [
            { index: true, element: renderWithFallback(<JobList />) },
            {
              path: ':shiftId',
              element: renderWithFallback(<EventShiftSignup />),
            },
          ],
        },
        {
          path: 'signup-confirm/:hoursId',
          element: renderWithFallback(<EventShiftConfirmation />),
        },
      ],
    },
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
      path: 'signup-confirm/:hoursId',
      element: renderWithFallback(<Confirmation />),
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
    },
  ],
};

export default homeChefRouter;
