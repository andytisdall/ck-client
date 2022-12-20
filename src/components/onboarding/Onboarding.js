import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-activity/dist/Spinner';
import 'react-activity/dist/Spinner.css';

import './Onboarding.css';
import { getRestaurant } from '../../actions';
import { Outlet } from 'react-router-dom';

const OnboardingHome = ({ getRestaurant, restaurant, user }) => {
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
      {user && restaurant.name && renderRestaurant()}
      {!user && renderSignIn()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.user, restaurant: state.restaurant };
};

export default connect(mapStateToProps, { getRestaurant })(OnboardingHome);
