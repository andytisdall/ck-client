import { GoogleLogin } from '@react-oauth/google';
import { connect } from 'react-redux';

import useLoading from '../../hooks/useLoading';
import Loading from '../reusable/Loading';
import * as actions from '../../actions';

const GoogleSignIn = ({ setError, googleSignIn }) => {
  const [loading, setLoading] = useLoading();
  if (loading) {
    return <Loading />;
  }
  return (
    <GoogleLogin
      onSuccess={({ credential }) => {
        setLoading(true);
        googleSignIn(credential);
      }}
      onError={setError}
    />
  );
};

export default connect(null, actions)(GoogleSignIn);
