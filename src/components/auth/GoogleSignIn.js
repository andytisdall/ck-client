import { GoogleLogin } from '@react-oauth/google';
import { connect } from 'react-redux';

import * as actions from '../../actions';

const GoogleSignIn = ({ setError, googleSignIn }) => {
  return <GoogleLogin onSuccess={googleSignIn} onError={setError} />;
};

export default connect(null, actions)(GoogleSignIn);
