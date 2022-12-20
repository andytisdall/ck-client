import { Link } from 'react-router-dom';

const OnboardingHome = () => {
  return (
    <div>
      <Link to="documents" className="home-link">
        Upload your documents
      </Link>
    </div>
  );
};

export default OnboardingHome;
