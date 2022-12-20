import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home main">
      <h1>Home</h1>
      <Link to="onboarding">
        <div className="home-link">Meal Program Onboarding</div>
      </Link>
      <Link to="text">
        <div className="home-link">Text Service</div>
      </Link>
      <Link to="admin">
        <div className="home-link">Admin</div>
      </Link>
    </div>
  );
};
export default Home;
