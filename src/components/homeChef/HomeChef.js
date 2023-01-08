import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';

import './HomeChef.css';

const OnboardingHome = ({ user }) => {
  const renderSignIn = () => {
    return <h3>Sign in to access this page.</h3>;
  };

  return (
    <div className="main home-chef">
      <h1 className="page-header">Home Chef</h1>
      {user && <Outlet />}
      {!user && renderSignIn()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.user };
};

export default connect(mapStateToProps)(OnboardingHome);
