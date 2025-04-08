import { Link } from 'react-router-dom';

import SignIn from './SignIn';
import GoogleSignIn from './GoogleSignIn';

const SignedOut = () => {
  return (
    <>
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
    </>
  );
};

export default SignedOut;
