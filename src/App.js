import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';

import './App.css';
import './components/reusable/TextButton.css';
import renderWithFallback from './components/reusable/renderWithFallback';

// text service
import textRouter from './components/text/textRouter';

// meal program onboarding
import mealProgramRouter from './components/mealProgram/mealProgramRouter.js';

// admin
import adminRouter from './components/admin/adminRouter';

// user settings
import userRouter from './components/user/userRouter';

// home chef
import homeChefRouter from './components/homeChef/homeChefRouter';

// forms
import formsRouter from './components/forms/formsRouter';

const Home = React.lazy(() => import('./components/Home'));
const Header = React.lazy(() => import('./components/Header'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: renderWithFallback(<Header />),
    children: [
      {
        index: true,
        element: renderWithFallback(<Home />),
      },
      textRouter,
      adminRouter,
      mealProgramRouter,
      userRouter,
      homeChefRouter,
    ],
  },
  formsRouter,
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
