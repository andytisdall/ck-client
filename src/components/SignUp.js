import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';
import Loading from './reusable/Loading';

const Header = ({ signIn, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    signIn(username, password);
    // in case there's already an error message, the error won't cancel the spinner like it's supposed to
    setTimeout(() => {
      setLoading(false);
    }, 10000);
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

const mapStateToProps = (state) => {
  return { error: state.error.error };
};

export default connect(mapStateToProps, { signIn, signOut })(Header);
