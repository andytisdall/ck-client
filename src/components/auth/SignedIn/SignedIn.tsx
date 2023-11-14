import { useState } from 'react';
import { Link } from 'react-router-dom';

import ConnectGoogle from './../../user/ConnectGoogle';
import {
  useGetUserQuery,
  useSignOutMutation,
} from '../../../state/apis/authApi';

const SignedIn = () => {
  const [showGoogleSignin, setShowGoogleSignin] = useState(false);

  const [signOut] = useSignOutMutation();
  const { data } = useGetUserQuery();

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

export default SignedIn;
