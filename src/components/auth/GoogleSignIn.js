import { GoogleLogin } from '@react-oauth/google';
import { connect } from 'react-redux';

import useLoading from '../../hooks/useLoading';
import * as actions from '../../actions';
import Loading from '../reusable/Loading';

const GoogleSignIn = ({ setError, googleSignIn }) => {
  const [loading, setLoading] = useLoading();
  if (loading) {
    return <Loading />;
  }
  return (
    <GoogleLogin
      onSuccess={() => {
        setLoading(true);
        googleSignIn();
      }}
      onError={setError}
    />
  );
};

export default connect(null, actions)(GoogleSignIn);
