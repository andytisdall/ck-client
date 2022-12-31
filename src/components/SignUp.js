import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-activity/dist/Spinner';
import 'react-activity/dist/Spinner.css';

import { signIn, signOut } from '../actions';

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
    return <Spinner size={30} />;
  }

  return (
    <div className="signin">
      <div className="signin-title">Sign In</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          name="username"
          className="input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          name="password"
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { error: state.error.error };
};

export default connect(mapStateToProps, { signIn, signOut })(Header);
