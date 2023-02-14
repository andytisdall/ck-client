import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';

import './Onboarding.css';
import { getRestaurant } from '../../actions';
import OnboardingHome from './OnboardingHome';
import Documents from './Documents';
import FileSuccess from '../reusable/FileSuccess';
import DocusignSign from '../reusable/DocusignSign';
import DocusignSuccess from '../reusable/DocusignSuccess';
import Loading from '../reusable/Loading';

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
    { index: true, element: <OnboardingHome /> },
    { path: 'documents', element: <Documents /> },
    {
      path: 'docusign',
      children: [
        {
          path: 'sign',
          element: <DocusignSign accountType="restaurant" />,
        },
        {
          path: 'success',
          element: <DocusignSuccess accountType="restaurant" />,
        },
      ],
    },
    { path: 'file-success', element: <FileSuccess /> },
  ],
};

export default onboardingRouter;
