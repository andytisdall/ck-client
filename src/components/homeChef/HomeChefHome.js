import { Link } from 'react-router-dom';

const HomeChefHome = () => {
  return (
    <div>
      <Link to="signup" className="home-link">
        Sign Up to Stock a Town Fridge
      </Link>
      <Link to="chef" className="home-link">
        See Fridges You've Signed Up For
      </Link>
      <Link to="resources" className="home-link">
        Home Chef Resources
      </Link>
      <Link to="onboarding" className="home-link">
        Onboarding
      </Link>
    </div>
  );
};

export default HomeChefHome;
