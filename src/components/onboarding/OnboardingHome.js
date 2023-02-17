import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import TextButton from '../reusable/TextButton';

const OnboardingHome = ({ restaurant }) => {
  const renderChecklist = () => {
    const renderAsLi = (doc) => {
      return <li key={doc}>{doc}</li>;
    };

    if (!restaurant.remainingDocs.length) {
      return <div>You have completed all onboarding actions</div>;
    }

    return (
      <div>
        <h4>Checklist</h4>
        <div className="onboarding-checklist">
          <div>Completed Documents:</div>
          <ul className="completed-doc">
            {restaurant.completedDocs.map(renderAsLi)}
          </ul>

          <div>Documents to Complete:</div>
          <ul className="incomplete-doc">
            {restaurant.remainingDocs.map(renderAsLi)}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderChecklist()}

      <TextButton
        to="documents"
        buttonText="Upload your documents"
        descriptionText="Provide the documents you need to get started in the meal program."
      />

      <TextButton
        to="docusign/sign"
        buttonText="Sign Documents"
        descriptionText="Sign the required forms using Docusign."
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { restaurant: state.restaurant.restaurant };
};

export default connect(mapStateToProps)(OnboardingHome);
