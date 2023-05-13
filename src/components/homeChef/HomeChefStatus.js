import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const HomeChefStatus = ({ user, uploadInProgress }) => {
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
            You have to complete the following tasks before you can sign up for
            Town Fridge deliveries:
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
        <div>
          <p>You have finished the following tasks:</p>
          <ul className="completed-doc">{completedActions.map(renderAsLi)}</ul>
        </div>
      );
    }
  };

  if (!uploadInProgress) {
    return (
      <div className="home-chef-status onboarding-checklist">
        {renderIncomplete()}
        {renderComplete()}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { user: state.user.user, uploadInProgress: state.files.inProgress };
};

export default connect(mapStateToProps)(HomeChefStatus);
