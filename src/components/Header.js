import { useState } from 'react';
import Spinner from 'react-activity/dist/Spinner';
import 'react-activity/dist/Spinner.css';

import './Header.css';
import server from '../api';

const Header = ({ user, setUser, setError, userLoading }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const signIn = async (e) => {
    e.preventDefault();
    try {
      const res = await server.post('/signin', {
        username,
        password,
      });
      setUser(res.data.user);
      localStorage.setItem('ck-token', res.data.token);
    } catch (err) {
      setError(err.response?.data || "Sign in didn't work");
    }
  };

  const signOut = () => {
    localStorage.removeItem('ck-token');
    setUser(null);
  };

  const renderSignIn = () => {
    return (
      <form onSubmit={signIn}>
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
    );
  };

  const showUser = () => {
    return (
      <div className="header-items">
        <div>Logged in as {user.username}</div>
        <button onClick={signOut}>Sign Out</button>
      </div>
    );
  };

  const renderBasedOnUserStatus = () => {
    return user ? showUser() : renderSignIn();
  };

  return (
    <div className="header">
      <a href="/">
        <h1>CK Text Service</h1>
      </a>
      {userLoading ? (
        <Spinner size={20} color="black" />
      ) : (
        // 'Loading'
        renderBasedOnUserStatus()
      )}
    </div>
  );
};

export default Header;
