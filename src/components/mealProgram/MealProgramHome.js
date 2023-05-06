import { connect } from 'react-redux';

import TextButton from '../reusable/TextButton';

const onboardingDescription =
  'Fill out and upload the documents that are required of meal program restaurants';

const resourcesDescription =
  'Access meal guidelines, label templates, and invoices';

const MealProgramHome = ({ restaurant }) => {
  return (
    <div>
      {restaurant.status === 'Active' && (
        <TextButton
          to="resources"
          buttonText="Resources"
          descriptionText={resourcesDescription}
        />
      )}
      <TextButton
        to="onboarding"
        buttonText="Onboarding"
        descriptionText={onboardingDescription}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { restaurant: state.restaurant.restaurant };
};

export default connect(mapStateToProps)(MealProgramHome);
