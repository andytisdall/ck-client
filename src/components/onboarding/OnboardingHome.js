import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const OnboardingHome = ({ restaurant }) => {
  const renderChecklist = () => {
    return (
      <div>
        <h4>Checklist</h4>
        <div className="onboarding-checklist">
          <div>Completed Documents:</div>
          <ul>
            {restaurant.completedDocs.map((doc) => {
              return (
                <li key={doc} className="completed-doc">
                  {doc}
                </li>
              );
            })}
          </ul>
          {restaurant.remainingDocs ? (
            <>
              <div>Documents to Complete:</div>
              <ul>
                {restaurant.remainingDocs.map((doc) => {
                  return (
                    <li key={doc} className="incomplete-doc">
                      {doc}
                    </li>
                  );
                })}
              </ul>
            </>
          ) : null}
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
