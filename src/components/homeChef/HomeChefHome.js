import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import TextButton from '../reusable/TextButton';

const shiftSignupDescription =
  'See availability for town fridges and sign up to make a delivery.';
const chefDescription =
  "See upcoming deliveries you've signed up for, and past deliveries you've made.";
const resourcesDescription =
  'Get access to the CK recipe library and connect with other Home Chefs on slack';
const onboardingDescription =
  'Complete the tasks necessary to start making deliveries';

const HomeChefHome = ({ user }) => {
  const renderStatus = () => {
    if (!user?.homeChefStatus) {
      return;
    }
    if (user.homeChefStatus === 'Active') {
      return (
        <p>
          You are done with the onboarding process and may sign up for Town
          Fridge deliveries
        </p>
      );
    }
    const foodHandler =
      'Obtain a Food Handler certification and upload the certificate';
    const volunteerAgreement = 'Sign our volunteer agreement';

    let incompleteActions = [];
    let completedActions = [];
    if (!user.foodHandler) {
      incompleteActions.push(foodHandler);
    } else {
      completedActions.push(foodHandler);
    }
    if (!user.volunteerAgreement) {
      incompleteActions.push(volunteerAgreement);
    } else {
      completedActions.push(volunteerAgreement);
    }

    const renderAsLi = (text) => {
      return <li key={text}>{text}</li>;
    };

    const renderIncomplete = () => {
      if (incompleteActions.length) {
        return (
          <div>
            <p>
              You have to complete the following tasks before you can sign up
              for Town Fridge deliveries:
            </p>
            <Link to="onboarding/documents">
              <ul className="incomplete-doc">
                {incompleteActions.map(renderAsLi)}
              </ul>
            </Link>
          </div>
        );
      }
    };

    const renderComplete = () => {
      if (completedActions.length) {
        return (
          <div className="onbpoarding-checklist">
            <p>You have finished the following tasks:</p>
            <ul className="completed-doc">
              {completedActions.map(renderAsLi)}
            </ul>
          </div>
        );
      }
    };

    return (
      <div>
        {renderIncomplete()}
        {renderComplete()}
      </div>
    );
  };

  return (
    <div>
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
        to="onboarding"
        buttonText="Onboarding"
        descriptionText={onboardingDescription}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.user };
};

export default connect(mapStateToProps)(HomeChefHome);
