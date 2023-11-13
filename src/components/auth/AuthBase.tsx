import { Link } from 'react-router-dom';
import { useState } from 'react';

import Loading from './../reusable/loading/Loading';

import { useGetUserQuery, useSignOutMutation } from '../../state/apis/authApi';
import ConnectGoogle from './../user/ConnectGoogle';
import SignIn from './SignIn';
import GoogleSignIn from './GoogleSignIn';

const AuthBase = () => {
  const [showGoogleSignin, setShowGoogleSignin] = useState(false);
  const { data, isFetching } = useGetUserQuery();
  const [signOut] = useSignOutMutation();

  const showUser = () => {
    return (
      <div className="header-auth">
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
      </div>
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

  return isFetching ? <Loading /> : renderBasedOnUserStatus();
};

export default AuthBase;
