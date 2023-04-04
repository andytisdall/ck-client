import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import TextButton from '../reusable/TextButton';

const documentsToUpload = [
  'Restaurant Contract',
  'Business License',
  'W9',
  'Direct Deposit Form',
  'Health Department Permit',
];

const MealProgramHome = ({ restaurant }) => {
  const renderChecklist = () => {
    const renderAsLi = (doc) => {
      let to;
      if (documentsToUpload.includes(doc)) {
        to = 'documents';
      } else {
        to = 'docusign/sign';
      }
      return (
        <Link to={to}>
          <li key={doc}>{doc}</li>
        </Link>
      );
    };

    if (!restaurant.remainingDocs.length) {
      return <div>You have completed all onboarding actions</div>;
    }

    return (
      <div>
        <h4>Checklist</h4>
        <div className="meal-program-checklist">
          <div>Completed Documents:</div>
          <ul className="completed-doc">
            {restaurant.completedDocs.map(renderAsLi)}
          </ul>

          <div>Documents to Complete:</div>
          <ul className="incomplete-doc">
            {restaurant.remainingDocs.map((d) => d.title).map(renderAsLi)}
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

export default connect(mapStateToProps)(MealProgramHome);
