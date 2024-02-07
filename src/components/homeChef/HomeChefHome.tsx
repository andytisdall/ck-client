import { lazy } from 'react';

import { useGetCampaignQuery } from '../../state/apis/volunteerApi/homeChefApi';
import { useGetUserInfoQuery } from '../../state/apis/authApi';
import { slidesDescription } from './onboarding/HomeChefOnboarding';
import TextButton from '../reusable/TextButton';
import renderWithFallback from '../reusable/loading/renderWithFallback';

const FridgeMap = lazy(() => import('./fridgeMap/FridgeMap'));

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
const appDescription =
  'Download and install the Home Chef App, where you can sign up for shifts and send alerts about your Town Fridge deliveries';

const HomeChefHome = () => {
  const userInfo = useGetUserInfoQuery().data;
  const campaign = useGetCampaignQuery().data;

  const renderStatus = () => {
    if (userInfo?.homeChefStatus === 'Active') {
      return (
        <p className="hc-home-active-status">
          <strong>Your Status:</strong> You are done with the onboarding process
          and may sign up for Town Fridge deliveries
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
    if (campaign?.mealsDonated) {
      return (
        <div className="home-chef-total-meals">
          To date, CK Home Chefs have delivered {campaign.mealsDonated} meals to
          Oakland Town Fridges!
        </div>
      );
    }
  };

  return (
    <div className="hc-home">
      <div>
        <div className="home-chef-announcement">
          <h3>Upcoming Home Chef Supply Pick Up</h3>
          <h4>Tuesday, 2/13</h4>
          <h4>4-6pm at the CK Kitchen, 2270 Telegraph Ave</h4>
          <p>
            * pick up containers, labels and local produce sourced from Mandela
            Partners.
          </p>
        </div>
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
        {userInfo?.homeChefStatus === 'Active' && (
          <>
            <TextButton
              to="../home-chef-app"
              buttonText="Get the CK Home Chef App"
              descriptionText={appDescription}
            />
            <TextButton
              to="onboarding/orientation-slides"
              buttonText="Read the Orientation Materials"
              descriptionText={slidesDescription}
            />
          </>
        )}
        {renderWithFallback(<FridgeMap />)}
      </div>
      <div className="home-chef-home-right-col">
        <img
          className="hc-home-photo"
          src="/images/home-chef/town-fridge.jpg"
          alt="home chef header"
        />
        {renderMealsDonated()}
      </div>
    </div>
  );
};

export default HomeChefHome;
