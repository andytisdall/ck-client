import TextButton from '../../reusable/TextButton';

const HomeChefDocuments = () => {
  return (
    <div>
      <h2>Upload Your Documents</h2>
      <div className="col">
        <TextButton
          to="../docusign/sign"
          buttonText="Sign the Volunteer Agreement"
        />
        <TextButton
          to="../upload-food-handler"
          buttonText="Upload Your Food Handler Certification"
        />

        <TextButton
          to="https://premierfoodsafety.com/food-handlers-card/california"
          buttonText="Apply for your Food Handler Ceritifcation"
        />
      </div>
    </div>
  );
};

// volunteer agreement upload
// food handler sign up link
// food handler upload

export default HomeChefDocuments;
