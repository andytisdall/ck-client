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

import cboRouter from './components/cbo/cboRouter';

// public home chef app page (no sign in required)
const HomeChefApp = lazy(() => import('./components/homeChef/HomeChefApp'));
const SalesforceNotFound = lazy(
  () => import('./components/error/SalesforceNotFound')
);
const Home = lazy(() => import('./components/Home'));
const Header = lazy(() => import('./components/header/Header'));
const PageNotFound = lazy(() => import('./components/error/PageNotFound'));
const ForgotPassword = lazy(() => import('./components/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./components/user/ResetPassword'));
const DeleteD4JAccount = lazy(
  () => import('./components/user/DeleteD4JAccount')
);
const ConfirmEmail = lazy(() => import('./components/user/ConfirmEmail'));
// const Acrobat = lazy(() => import('./components/reusable/signature/Acrobat'));
// const AcrobatSuccess = lazy(
//   () => import('./components/reusable/signature/AcrobatSuccess')
// );

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

      {
        path: 'forgot-password',
        element: renderWithFallback(<ForgotPassword />),
      },
      {
        path: 'delete-data/:email',
        element: renderWithFallback(<DeleteD4JAccount />),
      },
      {
        path: 'd4japp/account/confirm/:code',
        element: renderWithFallback(<ConfirmEmail />),
      },
      {
        path: 'reset-password/:token',
        element: renderWithFallback(<ResetPassword />),
      },
      { path: 'home-chef-app', element: renderWithFallback(<HomeChefApp />) },

      textRouter,
      adminRouter,
      mealProgramRouter,
      userRouter,
      homeChefRouter,
      volunteersRouter,
      cboRouter,
      { path: '404', element: renderWithFallback(<SalesforceNotFound />) },
    ],
  },
  formsRouter,
]);

const App = () => {
  const error = useSelector((state: RootState) => state.error);
  const alert = useSelector((state: RootState) => state.alert);

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
