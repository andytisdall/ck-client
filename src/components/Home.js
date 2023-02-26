import { connect } from 'react-redux';
import { useEffect } from 'react';

import * as actions from '../actions';
import TextButton from './reusable/TextButton';
import './Home.css';

const homeChefDescription =
  'A hub for CK Home Chefs to get started in the program, sign up for Town Fridge Deliveries, and access resources like recipes.';

const mealProgramDescription =
  'A portal for restaurants participating in our meal program to complete the tasks necessary to start providing meals.';

const textServiceDescription =
  'An interface for sending out text message alerts, adding phone numbers to the subscriber lists and reviewing feedback received from users.';

const userDescription =
  'An area for users to see their information and to change their password or username.';

const adminDescription =
  'An interface for CK staff to create users or restaurants for this site.';

const Home = ({ user, restaurant, getRestaurant, getUserInfo }) => {
  useEffect(() => {
    if (user && !user.lastName) {
      getRestaurant();
      getUserInfo();
    }
  }, [user, getRestaurant, getUserInfo]);

  const renderNoUser = () => {
    return (
      <p>
        Please sign in to access the features of the Community Kitchens portal.
      </p>
    );
  };

  const renderWithUser = () => {
    return (
      <>
        {renderHomeChef()}
        {renderMealProgram()}
        {renderTextService()}
        {renderUserSettings()}
        {renderAdmin()}
      </>
    );
  };

  const renderHomeChef = () => {
    if (user.homeChefStatus) {
      return (
        <TextButton
          to="home-chef"
          buttonText="Home Chef"
          descriptionText={homeChefDescription}
        />
      );
    }
  };

  const renderMealProgram = () => {
    if (restaurant && restaurant.user === user.id) {
      return (
        <TextButton
          to="onboarding"
          buttonText="Meal Program Onboarding"
          descriptionText={mealProgramDescription}
        />
      );
    }
  };

  const renderTextService = () => {
    if (user.admin) {
      return (
        <TextButton
          to="text"
          buttonText="Text Service"
          descriptionText={textServiceDescription}
        />
      );
    }
  };

  const renderUserSettings = () => {
    return (
      <TextButton
        to="user"
        buttonText="User Settings"
        descriptionText={userDescription}
      />
    );
  };

  const renderAdmin = () => {
    if (user.admin) {
      return (
        <TextButton
          to="admin"
          buttonText="Admin"
          descriptionText={adminDescription}
        />
      );
    }
  };

  return (
    <div className="home main">
      <h1>Home</h1>
      {user ? renderWithUser() : renderNoUser()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.user, restaurant: state.restaurant.restaurant };
};

export default connect(mapStateToProps, actions)(Home);
