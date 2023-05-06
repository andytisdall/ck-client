import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';

import renderWithFallback from '../reusable/renderWithFallback';
import Loading from '../reusable/Loading';
import './MealProgram.css';
import './Onboarding.css';

import * as actions from '../../actions';

const MealProgramHome = React.lazy(() => import('./MealProgramHome'));
const Onboarding = React.lazy(() => import('./Onboarding'));
const UploadDocuments = React.lazy(() => import('./UploadDocuments'));
const SignDocuments = React.lazy(() => import('./SignDocuments'));
const FileSuccess = React.lazy(() => import('../reusable/FileSuccess'));
const DocusignSign = React.lazy(() => import('../reusable/DocusignSign'));
const DocusignSuccess = React.lazy(() => import('../reusable/DocusignSuccess'));
const SignDocumentsHome = React.lazy(() => import('./SignDocumentsHome'));
const Resources = React.lazy(() => import('./Resources'));

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
    return (
      <>
        <div className="meal-program-restaurant-section">
          <div>Your Restaurant:</div>
          <div className="meal-program-restaurant-name">{restaurant.name}</div>
        </div>
        <div className="meal-program-restaurant-section">
          <div>Status:</div>
          <div className="meal-program-restaurant-name">
            {restaurant.status}
          </div>
        </div>
      </>
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
    { path: 'resources', element: renderWithFallback(<Resources />) },
    { path: 'onboarding', element: renderWithFallback(<Onboarding />) },
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
            <DocusignSuccess returnLink="/meal-program" />
          ),
        },
      ],
    },
    {
      path: 'file-success',
      element: renderWithFallback(<FileSuccess returnLink="/meal-program" />),
    },
  ],
};

export default mealProgramRouter;
