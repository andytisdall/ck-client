import { Link } from 'react-router-dom';

const HomeChefHome = () => {
  return (
    <div>
      <Link to="signup" className="home-link">
        Sign Up
      </Link>
      <Link to="resources" className="home-link">
        Resources
      </Link>
      <Link to="onboarding" className="home-link">
        Onboarding
      </Link>
    </div>
  );
};

export default HomeChefHome;
