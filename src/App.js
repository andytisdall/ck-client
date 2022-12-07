import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import server from './api';
import Header from './components/Header';
import Main from './components/Main';
import './App.css';

const App = () => {
  const [user, setUser] = useState();
  const [userLoading, setUserLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setUserLoading(true);
    const token = localStorage.getItem('ck-token');
    const getUser = async () => {
      try {
        const res = await server.get('/user');
        setUser(res.data);
      } catch (err) {
        setError(err.response?.data || "Get user didn't work");
      }
      setUserLoading(false);
    };
    if (token) {
      getUser();
    } else {
      setUserLoading(false);
    }
  }, []);

  useEffect(() => {
    setError(null);
  }, [user]);

  const renderError = () => {
    return <div className="error">{error}</div>;
  };

  return (
    <div className="app">
      <BrowserRouter>
        <Header
          user={user}
          userLoading={userLoading}
          setUser={setUser}
          setError={setError}
        />
        <Main user={user} setError={setError} />
        {error && renderError()}
      </BrowserRouter>
    </div>
  );
};

export default App;
