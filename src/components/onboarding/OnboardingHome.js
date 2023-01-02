import { Link } from 'react-router-dom';

const OnboardingHome = () => {
  return (
    <div>
      <Link to="documents" className="home-link">
        Upload your documents
      </Link>
      <Link to="docusign/login" className="home-link">
        Sign Documents
      </Link>
    </div>
  );
};

export default OnboardingHome;
