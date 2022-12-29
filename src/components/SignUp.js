import { useState } from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

const Header = ({ signIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    signIn(username, password);
  };


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


export default connect(null, { signIn, signOut })(Header);
