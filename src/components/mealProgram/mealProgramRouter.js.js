import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';

import renderWithFallback from '../reusable/renderWithFallback';
import Loading from '../reusable/Loading';
import './MealProgram.css';

import * as actions from '../../actions';

const MealProgramHome = React.lazy(() => import('./MealProgramHome'));
const Onboarding = React.lazy(() => import('./Onboarding/Onboarding'));
const OnboardingHome = React.lazy(() => import('./Onboarding/OnboardingHome'));
const UploadDocuments = React.lazy(() =>
  import('./Onboarding/UploadDocuments')
);
const SignDocuments = React.lazy(() => import('./Onboarding/SignDocuments'));
const FileSuccess = React.lazy(() => import('../reusable/FileSuccess'));
const DocusignSign = React.lazy(() => import('../reusable/DocusignSign'));
const DocusignSuccess = React.lazy(() => import('../reusable/DocusignSuccess'));
const SignDocumentsHome = React.lazy(() =>
  import('./Onboarding/SignDocumentsHome')
);
const Resources = React.lazy(() => import('./Resources/Resources'));
const ResourcesHome = React.lazy(() => import('./Resources/ResourcesHome'));
const Invoicing = React.lazy(() => import('./Resources/Invoicing'));
const MealGuidelines = React.lazy(() => import('./Resources/MealGuidelines'));
const Packaging = React.lazy(() => import('./Resources/Packaging'));
const YouthGuidelines = React.lazy(() => import('./Resources/YouthGuidelines'));
const EncampmentGuidelines = React.lazy(() =>
  import('./Resources/EncampmentGuidelines')
);

const MealProgram = ({
  getRestaurant,
  restaurant,
  user,
  getMealProgramInfo,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      if (!restaurant) {
        getRestaurant();
      } else if (!restaurant.remainingDocs) {
        getMealProgramInfo();
      } else {
        setLoading(false);
      }
    }
  }, [restaurant, setLoading, getRestaurant, getMealProgramInfo, user]);

  const renderRestaurant = () => {
    const status = restaurant.status === 'Active' ? 'active' : 'inactive';
    return (
      <div className="meal-program-restaurant">
        <div className="meal-program-restaurant-section">
          <div>Your Restaurant:</div>
          <div className="meal-program-restaurant-name">{restaurant.name}</div>
        </div>
        <div className="meal-program-restaurant-section">
          <div>Status:</div>
          <div className={`meal-program-restaurant-status-${status}`}>
            {restaurant.status}
          </div>
        </div>
      </div>
    );
  };

  const renderSignIn = () => {
    return <h3>Sign in to access this page.</h3>;
  };

  return (
    <div className="main meal-program">
      <div className="meal-program-header">
        <Link to="/meal-program" className="meal-program-title">
          <h1 className="page-header">CK Meal Program</h1>
        </Link>
        {user && !loading && renderRestaurant()}
      </div>
      {user && loading && <Loading />}
      {user && !loading && <Outlet />}
      {!user && renderSignIn()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.user, restaurant: state.restaurant.restaurant };
};

const ConnectedMealProgram = connect(mapStateToProps, actions)(MealProgram);

const mealProgramRouter = {
  path: 'meal-program',
  element: <ConnectedMealProgram />,
  children: [
    { index: true, element: renderWithFallback(<MealProgramHome />) },
    {
      path: 'resources',
      element: renderWithFallback(<Resources />),
      children: [
        { index: true, element: renderWithFallback(<ResourcesHome />) },
        {
          path: 'meal-guidelines',
          element: renderWithFallback(<MealGuidelines />),
          children: [
            {
              path: 'encampment',
              element: renderWithFallback(<EncampmentGuidelines />),
            },
            { path: 'youth', element: renderWithFallback(<YouthGuidelines />) },
          ],
        },
        { path: 'invoicing', element: renderWithFallback(<Invoicing />) },
        { path: 'packaging', element: renderWithFallback(<Packaging />) },
      ],
    },
    {
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
            <FileSuccess returnLink="/meal-program" />
          ),
        },
      ],
    },
  ],
};

export default mealProgramRouter;
