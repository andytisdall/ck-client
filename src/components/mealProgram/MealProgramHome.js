import TextButton from '../reusable/TextButton';

const onboardingDescription =
  'Fill out and upload the documents that are required of meal program restaurants';

const resourcesDescription =
  'Access meal guidelines, label templates, and invoices';

const MealProgramHome = () => {
  return (
    <div>
      <TextButton
        to="onboarding"
        buttonText="Onboarding"
        descriptionText={onboardingDescription}
      />
      <TextButton
        to="resources"
        buttonText="Resources"
        descriptionText={resourcesDescription}
      />
    </div>
  );
};

export default MealProgramHome;
