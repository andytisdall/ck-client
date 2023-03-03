import TextButton from '../../reusable/TextButton';

const orientationDescription =
  'Watch the recorded Zoom orientation for new Home Chefs.';

const documentsDescription =
  'Send us your food handler certification and sign the volunteer agreement.';

const HomeChefOnboarding = () => {
  return (
    <div>
      <h2>Home Chef Onboarding</h2>
      <div>
        <TextButton
          to=""
          buttonText="Watch the Orientation Video"
          descriptionText={orientationDescription}
        />
        <TextButton
          to="documents"
          buttonText="Upload your Documents"
          descriptionText={documentsDescription}
        />
      </div>
    </div>
  );
};

export default HomeChefOnboarding;

// orientation video
// slack channel link
// documents
