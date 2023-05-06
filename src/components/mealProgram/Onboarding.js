import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../actions';
import TextButton from '../reusable/TextButton';

const Onboarding = ({ restaurant }) => {
  const renderChecklist = () => {
    const renderCompleteItem = (doc) => {
      return <li key={doc}>{doc}</li>;
    };

    const renderIncompleteItem = (doc) => {
      return (
        <Link to="onboarding" key={doc}>
          <li>{doc}</li>
        </Link>
      );
    };

    if (!restaurant.remainingDocs.length) {
      return (
        <div className="meal-program-status-active">
          <span className="bold">Your status:</span> You have completed all
          onboarding tasks and are eligible to provide meals.
        </div>
      );
    }

    return (
      <div>
        <h4>Checklist</h4>
        <div className="meal-program-checklist">
          {restaurant.completedDocs?.length > 0 && (
            <>
              <div>Completed Documents:</div>
              <ul className="completed-doc">
                {restaurant.completedDocs.map(renderCompleteItem)}
              </ul>
            </>
          )}

          <div>Documents to Complete:</div>
          <ul className="incomplete-doc">
            {restaurant.remainingDocs
              .map((d) => d.title)
              .map(renderIncompleteItem)}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h3>Onboarding Your Restaurant for the Meal Program</h3>
      {renderChecklist()}

      <TextButton
        to="../upload-documents"
        buttonText="Upload your documents"
        descriptionText="Provide the documents you need to get started in the meal program."
      />

      <TextButton
        to="../sign-documents"
        buttonText="Sign Documents"
        descriptionText="Sign the required forms using Docusign."
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { restaurant: state.restaurant.restaurant };
};

export default connect(mapStateToProps, actions)(Onboarding);
