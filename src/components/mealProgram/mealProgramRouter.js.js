import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';

import renderWithFallback from '../reusable/renderWithFallback';
import Loading from '../reusable/Loading';
import './MealProgram.css';
import * as actions from '../../actions';

const MealProgramHome = React.lazy(() => import('./MealProgram'));
const Documents = React.lazy(() => import('./Documents'));
const FileSuccess = React.lazy(() => import('../reusable/FileSuccess'));
const DocusignSign = React.lazy(() => import('../reusable/DocusignSign'));
const DocusignSuccess = React.lazy(() => import('../reusable/DocusignSuccess'));

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
        <h2>
          Restaurant: <span className="restaurant">{restaurant.name}</span>
        </h2>
        <Outlet />
      </>
    );
  };

  const renderSignIn = () => {
    return <h3>Sign in to access this page.</h3>;
  };

  return (
    <div className="main meal-program">
      <Link to="/meal-program" className="meal-program-header">
        <h1 className="page-header">Meal Program Onboarding</h1>
      </Link>
      {user && loading && <Loading />}
      {user && !loading && renderRestaurant()}
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
    { path: 'documents', element: renderWithFallback(<Documents />) },
    {
      path: 'docusign',
      children: [
        {
          path: 'sign',
          element: renderWithFallback(
            <DocusignSign accountType="restaurant" />
          ),
        },
        {
          path: 'success',
          element: renderWithFallback(
            <DocusignSuccess
              accountType="restaurant"
              returnLink="/meal-program"
            />
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
