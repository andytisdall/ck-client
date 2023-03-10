import { connect } from 'react-redux';
import React from 'react';

import TextButton from '../reusable/TextButton';
import renderWithFallback from '../reusable/renderWithFallback';

const FridgeMap = React.lazy(() => import('./fridgeMap/FridgeMap'));

const shiftSignupDescription =
  'See availability for town fridges and sign up to make a delivery';
const chefDescription =
  "See upcoming deliveries you've signed up for, and past deliveries you've made";
const resourcesDescription =
  'Get access to the CK recipe library and connect with other Home Chefs on slack';
const onboardingDescription =
  'Complete the tasks necessary to start making deliveries';
const emailDescription =
  'Let your friends know about CK Home Chef and invite them to cook for town fridges';

const HomeChefHome = ({ user, campaign }) => {
  const renderStatus = () => {
    if (user.homeChefStatus === 'Active') {
      return (
        <p className="hc-home-active-status">
          Your Status: You are done with the onboarding process and may sign up
          for Town Fridge deliveries
        </p>
      );
    } else {
      return (
        <TextButton
          to="onboarding"
          buttonText="Onboarding"
          descriptionText={onboardingDescription}
        />
      );
    }
  };

  const renderMealsDonated = () => {
    if (campaign.mealsDonated) {
      return (
        <div>
          To date, Home Chefs have delivered {campaign.mealsDonated} meals to
          Oakland Town Fridges!
        </div>
      );
    }
  };

  return (
    <div className="hc-home">
      <div>
        {renderMealsDonated()}
        {renderStatus()}
        <TextButton
          to="signup/list"
          buttonText="Sign Up to Stock a Town Fridge"
          descriptionText={shiftSignupDescription}
        />
        <TextButton
          to="chef"
          buttonText="See Fridges You've Signed Up For"
          descriptionText={chefDescription}
        />
        <TextButton
          to="resources"
          buttonText="Home Chef Resources"
          descriptionText={resourcesDescription}
        />
        <TextButton
          to="invite"
          buttonText="Invite your friends to join CK Home Chef"
          descriptionText={emailDescription}
        />
        {renderWithFallback(<FridgeMap />)}
      </div>
      <img
        className="hc-home-photo"
        src="/images/home-chef/town-fridge.jpg"
        alt="home chef header"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.user, campaign: state.homeChef.campaign };
};

export default connect(mapStateToProps)(HomeChefHome);
