import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-activity/dist/Spinner';
import 'react-activity/dist/Spinner.css';

import { getUser } from './actions';

import './App.css';
import AddPhone from './components/text/AddPhone';
import Text from './components/text/Text';
import TextMain from './components/text/TextMain';
import SendText from './components/text/SendText';
import TextSuccess from './components/text/TextSuccess';

import Onboarding from './components/onboarding/Onboarding';
import OnboardingHome from './components/onboarding/OnboardingHome';
import Documents from './components/onboarding/Documents';
import FileSuccess from './components/onboarding/FileSuccess';
import DocusignSign from './components/onboarding/DocusignSign';
import DSLogin from './components/onboarding/DSLogin';
import DocusignSuccess from './components/onboarding/DocusignSuccess';
import Docusign from './components/onboarding/Docusign';

import Header from './components/Header';
import Home from './components/Home';

import Admin from './components/admin/Admin';
import AdminHome from './components/admin/AdminHome';
import Create from './components/admin/Create';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'text',
        element: <Text />,
        children: [
          { index: true, element: <TextMain /> },
          {
            path: 'add-phone',
            element: <AddPhone />,
          },
          { path: 'send-text', element: <SendText /> },
          { path: 'text-success', element: <TextSuccess /> },
        ],
      },
      {
        path: 'onboarding',
        element: <Onboarding />,
        children: [
          { index: true, element: <OnboardingHome /> },
          { path: 'documents', element: <Documents /> },
          {
            path: 'docusign',
            element: <Docusign />,
            children: [
              { path: 'sign', element: <DocusignSign /> },
              { path: 'login', element: <DSLogin /> },
              { path: 'success', element: <DocusignSuccess /> },
            ],
          },
          { path: 'file-success', element: <FileSuccess /> },
        ],
      },
      {
        path: 'admin',
        element: <Admin />,
        children: [
          { index: true, element: <AdminHome /> },
          { path: 'create', element: <Create /> },
        ],
      },
    ],
  },
]);

const App = ({ user, getUser, error }) => {
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    setUserLoading(true);
    getUser();
  }, [getUser]);

  useEffect(() => {
    setUserLoading(false);
  }, [user]);

  const renderError = () => {
    return <div className="error">{error}</div>;
  };

  if (userLoading) {
    return <Spinner size={20} color="black" />;
  }

  return (
    <div className="app">
      <RouterProvider router={router} />
      {error && renderError()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.user, error: state.error.error };
};

export default connect(mapStateToProps, { getUser })(App);
