import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
      <Link to="documents" className="home-link">
        Upload your documents
      </Link>
      <Link to="docusign/sign" className="home-link">
        Sign Documents
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { restaurant: state.restaurant.restaurant };
};

export default connect(mapStateToProps)(OnboardingHome);
