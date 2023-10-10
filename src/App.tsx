import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';

import './App.css';
import './components/reusable/TextButton.css';
import renderWithFallback from './components/reusable/loading/renderWithFallback';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './state/store';
import { setError } from './state/apis/slices/errorSlice';
import { setAlert } from './state/apis/slices/alertSlice';
// text service
import textRouter from './components/text/textRouter';

// // meal program onboarding
import mealProgramRouter from './components/mealProgram/mealProgramRouter';

// // admin
import adminRouter from './components/admin/adminRouter';

// user settings
import userRouter from './components/user/userRouter';

// // home chef
import homeChefRouter from './components/homeChef/homeChefRouter';

// // forms
import formsRouter from './components/forms/formsRouter';

// // volunteers
import volunteersRouter from './components/volunteers/volunteersRouter';

// public home chef app page (no sign in required)
const HomeChefApp = lazy(() => import('./components/homeChef/HomeChefApp'));
const SalesforceNotFound = lazy(
  () => import('./components/error/SalesforceNotFound')
);
const Home = lazy(() => import('./components/Home'));
const Header = lazy(() => import('./components/Header'));
const PageNotFound = lazy(() => import('./components/error/PageNotFound'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: renderWithFallback(<Header />),
    errorElement: renderWithFallback(<PageNotFound />),
    children: [
      {
        index: true,
        element: renderWithFallback(<Home />),
      },
      { path: 'home-chef-app', element: renderWithFallback(<HomeChefApp />) },
      textRouter,
      adminRouter,
      mealProgramRouter,
      userRouter,
      homeChefRouter,
      volunteersRouter,
      { path: '404', element: renderWithFallback(<SalesforceNotFound />) },
    ],
  },
  formsRouter,
]);

const App = () => {
  const [error, alert] = useSelector((state: RootState) => [
    state.error,
    state.alert,
  ]);
  const dispatch = useDispatch();

  const renderError = () => {
    setTimeout(() => dispatch(setError('')), 5000);
    return <div className="error">{error.message}</div>;
  };

  const renderAlert = () => {
    setTimeout(() => dispatch(setAlert('')), 5000);
    return <div className="error alert">{alert.message}</div>;
  };

  return (
    <div className="app">
      <RouterProvider router={router} />
      {error.message && renderError()}
      {alert.message && renderAlert()}
    </div>
  );
};

export default App;
