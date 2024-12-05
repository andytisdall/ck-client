import { Link } from 'react-router-dom';

import { useGetUserInfoQuery } from '../../../state/apis/authApi';
import TextButton from '../../reusable/TextButton';

const videoDescription =
  'Watch the recorded Zoom orientation for new Home Chefs.';

export const slidesDescription =
  'Peruse the information presented at the Home Chef orientation';

const agreementDescription =
  'Read and e-sign our volunteer agreement through Docusign.';
const uploadDescription =
  'Once you have received your food handler certification, upload the document here.';
const applyDescription =
  'Follow this link to start the process of receiving your food handler certification.';

export const FOOD_HANDLER_URL =
  'https://premierfoodsafety.com/food-handlers-card/california';

const HomeChefOnboarding = () => {
  const userInfo = useGetUserInfoQuery().data;

  const renderActive = () => {
    if (userInfo?.homeChefStatus === 'Active') {
      return (
        <div className="home-chef-status">
          <p>
            You are done with the onboarding process and may sign up for Town
            Fridge deliveries.
          </p>
          <Link to="..">
            <button>Home Chef Home</button>
          </Link>
        </div>
      );
    }
  };

  const renderDocumentBtns = () => {
    return (
      <div className="col">
        <TextButton
          to="sign/HC"
          buttonText="Sign the Volunteer Agreement"
          descriptionText={agreementDescription}
        />
        <TextButton
          to={FOOD_HANDLER_URL}
          buttonText="Apply for your Food Handler Ceritifcation"
          descriptionText={applyDescription}
          outside
        />
        <TextButton
          to="upload-food-handler"
          buttonText="Upload Your Food Handler Certification"
          descriptionText={uploadDescription}
        />
      </div>
    );
  };

  return (
    <div>
      <h2>Home Chef Onboarding</h2>
      {renderActive()}
      <div>
        <TextButton
          to="orientation-video"
          buttonText="Watch the Orientation Video and Take the Home Chef Quiz"
          descriptionText={videoDescription}
        />
        <TextButton
          to="orientation-slides"
          buttonText="Read the Orientation Materials"
          descriptionText={slidesDescription}
        />
        {userInfo?.homeChefStatus !== 'Active' && renderDocumentBtns()}
      </div>
    </div>
  );
};

export default HomeChefOnboarding;
