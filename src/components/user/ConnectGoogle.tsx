import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';

import { useConnectGoogleMutation } from '../../state/apis/authApi';
import { setError } from '../../state/apis/slices/errorSlice';
import { setAlert } from '../../state/apis/slices/alertSlice';

import Loading from '../reusable/loading/Loading';

const ConnectGoogle = () => {
  const dispatch = useDispatch();
  const [connectGoogle, { isLoading }] = useConnectGoogleMutation();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <GoogleLogin
      onSuccess={({ credential }) => {
        if (credential) {
          connectGoogle(credential)
            .unwrap()
            .then(() =>
              dispatch(setAlert('You can now login using this google account.'))
            );
        }
      }}
      onError={() => dispatch(setError('Google Login Failed'))}
    />
  );
};

export default ConnectGoogle;
