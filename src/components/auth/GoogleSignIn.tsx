import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';

import { useGoogleSignInMutation } from '../../state/apis/authApi';
import { setError } from '../../state/apis/slices/errorSlice';

import Loading from '../reusable/loading/Loading';

const GoogleSignIn = () => {
  const dispatch = useDispatch();
  const [googleSignIn, { isLoading }] = useGoogleSignInMutation();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <GoogleLogin
      onSuccess={({ credential }) => {
        if (credential) {
          googleSignIn(credential);
        }
      }}
      onError={() => dispatch(setError('Google Login Failed'))}
    />
  );
};

export default GoogleSignIn;
