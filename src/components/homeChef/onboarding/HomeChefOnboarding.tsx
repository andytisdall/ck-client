import { Link } from 'react-router-dom';

import { useGetUserInfoQuery } from '../../../state/apis/authApi';
import TextButton from '../../reusable/TextButton';

const videoDescription =
  'Watch the recorded Zoom orientation for new Home Chefs.';

const documentsDescription =
  'Send us your food handler certification and sign the volunteer agreement.';

export const slidesDescription =
  'Peruse the information presented at the Home Chef orientation';

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

  return (
    <div>
      <h2>Home Chef Onboarding</h2>
      {renderActive()}
      <div>
        {userInfo?.homeChefStatus !== 'Active' && (
          <TextButton
            to="documents"
            buttonText="Upload your Documents"
            descriptionText={documentsDescription}
          />
        )}
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
      </div>
    </div>
  );
};

export default HomeChefOnboarding;
