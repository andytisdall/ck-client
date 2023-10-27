import { Outlet, Link } from 'react-router-dom';
import { useGetUserQuery, useSignOutMutation } from '../state/apis/authApi';
import { useState } from 'react';

import ConnectGoogle from './user/ConnectGoogle';
import Loading from './reusable/loading/Loading';
import SignIn from './auth/SignIn';
import GoogleSignIn from './auth/GoogleSignIn';
import './Header.css';

const Header = () => {
  const [showGoogleSignin, setShowGoogleSignin] = useState(false);
  const { data, isFetching } = useGetUserQuery();
  const [signOut] = useSignOutMutation();

  const showUser = () => {
    return (
      <>
        <button onClick={() => signOut()}>Sign Out</button>
        <div>
          <Link to="/user" className="user-link">
            {data?.username}
          </Link>
          {!data?.googleId &&
            (showGoogleSignin ? (
              <ConnectGoogle />
            ) : (
              <div
                onClick={() => setShowGoogleSignin(true)}
                className="retro-link forgot-password"
              >
                Connect your Google account
              </div>
            ))}
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
          <div>
            <GoogleSignIn />
            <Link to="/forgot-password">
              <div className="forgot-password">Forgot Password?</div>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const renderBasedOnUserStatus = () => {
    return data ? showUser() : renderSignIn();
  };

  return (
    <>
      <div className="header">
        <div className="header-left">
          <Link to="/">
            <img
              src="/images/logos/ck-logo.png"
              alt="ck logo"
              className="header-logo"
            />
          </Link>
        </div>

        <div className="header-right">
          {isFetching ? <Loading /> : renderBasedOnUserStatus()}
        </div>
      </div>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Header;
