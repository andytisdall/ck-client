import TextButton from '../../reusable/TextButton';

export const FOOD_HANDLER_URL =
  'https://premierfoodsafety.com/food-handlers-card/california';

const agreementDescription =
  'Read and e-sign our volunteer agreement through Docusign.';
const uploadDescription =
  'Once you have received your food handler certification, upload the document here.';
const applyDescription =
  'Follow this link to start the process of receiving your food handler certification.';

const HomeChefDocuments = () => {
  return (
    <div id="home-chef-documents">
      <h2>Upload Your Documents</h2>
      <div className="col">
        <TextButton
          to={FOOD_HANDLER_URL}
          buttonText="Apply for your Food Handler Ceritifcation"
          descriptionText={applyDescription}
          outside
        />
        <TextButton
          to="../upload-food-handler"
          buttonText="Upload Your Food Handler Certification"
          descriptionText={uploadDescription}
        />
        <TextButton
          to="../docusign/sign"
          buttonText="Sign the Volunteer Agreement"
          descriptionText={agreementDescription}
        />
      </div>
    </div>
  );
};

export default HomeChefDocuments;
