import { Link } from 'react-router-dom';

const HomeChefOnboarding = () => {
  return (
    <div>
      <h2>Home Chef Onboarding</h2>
      <div>
        <Link>Watch the Orientation Video</Link>
        <Link>Get Connected to our Slack Channel</Link>
        <Link to="documents">Upload your Documents</Link>
      </div>
    </div>
  );
};

export default HomeChefOnboarding;

// orientation video
// slack channel link
// documents
