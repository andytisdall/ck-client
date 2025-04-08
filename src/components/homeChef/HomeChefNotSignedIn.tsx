import { Link } from 'react-router-dom';

const HomeChefNotSignedIn = () => {
  return (
    <div>
      <div className="home-chef-announcement">
        <strong>You must be signed in to access this page.</strong>
      </div>
      <h3>If you have a username:</h3>
      <p>
        Thank you for becoming a CK Home Chef! Please log in with your
        credentials to begin the orientation and onboarding process or to access
        your account.
      </p>
      <br />
      <br />
      <h3>If not:</h3>
      <p>
        To become a Home Chef,{' '}
        <Link to="/forms/volunteer" className="retro-link">
          please complete the signup form.
        </Link>
        <br />
        Once you submit the form, you will be given a username so you can access
        this portal.
      </p>
      <br />
      <br />
      <Link to="../volunteers" className="retro-link">
        <strong>Other volunteer opportunities</strong>
      </Link>
    </div>
  );
};

export default HomeChefNotSignedIn;
