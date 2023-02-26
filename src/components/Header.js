import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Outlet, Link, useNavigate } from 'react-router-dom';

import * as actions from '../actions';
import Loading from './reusable/Loading';
import SignUp from './SignUp';
import './Header.css';

const Header = ({ getUser, user, signOut, error }) => {
  const [userLoading, setUserLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('ck-token');
    if (token) {
      setUserLoading(true);
      getUser();
    }
  }, [getUser]);

  useEffect(() => {
    if (user) {
      setUserLoading(false);
      if (!user.active) {
        navigate('user/change-password');
      }
    }
    if (error) {
      setUserLoading(false);
    }
  }, [user, error, navigate]);

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

  const renderBasedOnUserStatus = () => {
    return user ? showUser() : <SignUp />;
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
          {userLoading && <Loading />}
          {!userLoading && renderBasedOnUserStatus()}
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
    error: state.error.error,
  };
};

export default connect(mapStateToProps, actions)(Header);
