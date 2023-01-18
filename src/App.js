import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Header from './components/Header';
import Home from './components/Home';

// text service
import textRouter from './components/text/textRouter';

// meal program onboarding
import onboardingRouter from './components/onboarding/onboardingRouter';

// admin
import adminRouter from './components/admin/adminRouter';

// user settings
import userRouter from './components/user/userRouter';

// home chef
import homeChefRouter from './components/homeChef/homeChefRouter';

// forms
import formsRouter from './components/forms/formsRouter';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      { index: true, element: <Home /> },
      textRouter,
      adminRouter,
      onboardingRouter,
      userRouter,
      homeChefRouter,
      formsRouter,
    ],
  },
]);

const App = ({ alert, error }) => {
  const renderError = () => {
    return <div className="error">{error}</div>;
  };

  const renderAlert = () => {
    return <div className="error alert">{alert}</div>;
  };

  return (
    <div className="app">
      <RouterProvider router={router} />
      {error && renderError()}
      {alert && renderAlert()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { error: state.error.error, alert: state.alert.message };
};

export default connect(mapStateToProps)(App);
