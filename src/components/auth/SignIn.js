import { useState } from 'react';
import { connect } from 'react-redux';

import './SignIn.css';
import * as actions from '../../actions';
import useLoading from '../../hooks/useLoading';
import Loading from '../reusable/Loading';

const SignIn = ({ signIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useLoading();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    signIn(username, password);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="signin">
      <form onSubmit={handleSubmit}>
        <div className="signin-button">
          <div className="signin-title">Sign In</div>
          <input type="submit" />
        </div>
        <div className="signin-fields">
          <input
            name="username"
            className="input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            name="password"
            className="input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default connect(null, actions)(SignIn);
