import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';

import renderWithFallback from '../reusable/renderWithFallback';
import Loading from '../reusable/Loading';
import './Onboarding.css';
import { getRestaurant } from '../../actions';
const OnboardingHome = React.lazy(() => import('./OnboardingHome'));
const Documents = React.lazy(() => import('./Documents'));
const FileSuccess = React.lazy(() => import('../reusable/FileSuccess'));
const DocusignSign = React.lazy(() => import('../reusable/DocusignSign'));
const DocusignSuccess = React.lazy(() => import('../reusable/DocusignSuccess'));

const Onboarding = ({ getRestaurant, restaurant, user }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(true);
      getRestaurant();
    }
  }, [user, getRestaurant]);

  useEffect(() => {
    if (restaurant) {
      setLoading(false);
    }
  }, [restaurant]);

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
    <div className="main onboarding">
      <Link to="/onboarding">
        <h1 className="page-header">Meal Program Onboarding</h1>
      </Link>
      {user && loading && <Loading />}
      {user && restaurant && renderRestaurant()}
      {!user && renderSignIn()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.user, restaurant: state.restaurant.restaurant };
};

const ConnectedOnboarding = connect(mapStateToProps, { getRestaurant })(
  Onboarding
);

const onboardingRouter = {
  path: 'onboarding',
  element: <ConnectedOnboarding />,
  children: [
    { index: true, element: renderWithFallback(<OnboardingHome />) },
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
              returnLink="/onboarding"
            />
          ),
        },
      ],
    },
    {
      path: 'file-success',
      element: renderWithFallback(<FileSuccess returnLink="/onboarding" />),
    },
  ],
};

export default onboardingRouter;
