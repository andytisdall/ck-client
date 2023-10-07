import { useNavigate } from 'react-router-dom';

import { useGetUserInfoQuery } from '../../../state/apis/authApi';
import TextButton from '../../reusable/TextButton';

const videoDescription =
  'Watch the recorded Zoom orientation for new Home Chefs.';

const documentsDescription =
  'Send us your food handler certification and sign the volunteer agreement.';

export const slidesDescription =
  'Peruse the information presented at the Home Chef orientation';

const HomeChefOnboarding = () => {
  const navigate = useNavigate();

  const userInfo = useGetUserInfoQuery().data;

  if (userInfo?.homeChefStatus === 'Active') {
    navigate('/home-chef');
  }

  return (
    <div>
      <h2>Home Chef Onboarding</h2>
      <div>
        <TextButton
          to="documents"
          buttonText="Upload your Documents"
          descriptionText={documentsDescription}
        />
        <TextButton
          to="orientation-video"
          buttonText="Watch the Orientation Video"
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
