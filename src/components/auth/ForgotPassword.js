import { useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import './SignIn.css';
import useLoading from '../../hooks/useLoading';
import Loading from '../reusable/Loading';

const ForgotPassword = ({ forgotPassword }) => {
  const [username, setUsername] = useState('');

  const [loading, setLoading] = useLoading();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    forgotPassword(username);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="signin-fields">
          <input
            name="username"
            className="input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="signin-button">
          <div className="signin-title">Sign In</div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default connect(null, actions)(ForgotPassword);
