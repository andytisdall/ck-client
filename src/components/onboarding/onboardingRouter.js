import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-activity/dist/Spinner';
import 'react-activity/dist/Spinner.css';

import './Onboarding.css';
import { getRestaurant } from '../../actions';
import { Outlet } from 'react-router-dom';
import OnboardingHome from './OnboardingHome';
import Documents from './Documents';
import FileSuccess from '../documents/FileSuccess';
import DocusignSign from '../documents/DocusignSign';
import DSLogin from '../documents/DSLogin';
import DocusignSuccess from '../documents/DocusignSuccess';

const Onboarding = ({ getRestaurant, restaurant, user }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      getRestaurant();
    }
  }, [user, getRestaurant]);

  useEffect(() => {
    setLoading(false);
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
      <h1 className="page-header">Onboarding</h1>
      {loading && <Spinner size={20} color="black" className="spinner" />}
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
          element: <DocusignSign accountType="restaurant" docCode="RC" />,
        },
        { path: 'login', element: <DSLogin accountType="restaurant" /> },
        {
          path: 'success',
          element: <DocusignSuccess accountType="restaurant" docCode="RC" />,
        },
      ],
    },
    { path: 'file-success', element: <FileSuccess /> },
  ],
};

export default onboardingRouter;
