import { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { signIn, signOut } from '../actions';
import './Header.css';

const Header = ({ user, signOut, signIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    signIn(username, password);
  };

  const renderSignIn = () => {
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

  const showUser = () => {
    return (
      <div className="header-right">
        <div>Logged in as {user.username}</div>
        <button onClick={signOut}>Sign Out</button>
      </div>
    );
  };

  const renderBasedOnUserStatus = () => {
    return user ? showUser() : renderSignIn();
  };

  return (
    <>
      <div className="header">
        <div className="header-left">
          <Link to=".." relative="path">
            <button>Back</button>
          </Link>
          <Link to="/">
            <img
              src="/images/ck-logo.png"
              alt="ck logo"
              className="header-logo"
            />
          </Link>
        </div>

        {renderBasedOnUserStatus()}
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, { signIn, signOut })(Header);
