import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Outlet, Link, useNavigate } from 'react-router-dom';

import * as actions from '../actions';
import Loading from './reusable/Loading';
import SignIn from './auth/SignIn';
import GoogleSignIn from './auth/GoogleSignIn';
import './Header.css';
import useLoading from '../hooks/useLoading';

const Header = ({ getUser, user, signOut }) => {
  const [loading, setLoading] = useLoading();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('ck-token');
    if (token) {
      setLoading(true);
      getUser();
    }
  }, [getUser, setLoading]);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user, setLoading]);

  const showUser = () => {
    return (
      <>
        <button onClick={signOut}>Sign Out</button>
        <div>
          <Link to="/user" className="user-link">
            {user.username}
          </Link>
        </div>
      </>
    );
  };

  const renderSignIn = () => {
    return (
      <div className="header-auth">
        <SignIn />
        <div className="header-auth-google">
          <p className="header-auth-text">OR</p>
          <GoogleSignIn />
        </div>
      </div>
    );
  };

  const renderBasedOnUserStatus = () => {
    return user ? showUser() : renderSignIn();
  };

  return (
    <>
      <div className="header">
        <div className="header-left">
          <button onClick={() => navigate(-1)}>Back</button>

          <Link to="/">
            <img
              src="/images/logos/ck-logo.png"
              alt="ck logo"
              className="header-logo"
            />
          </Link>
        </div>
        <div className="header-right">
          {loading && <Loading />}
          {!loading && renderBasedOnUserStatus()}
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, actions)(Header);
