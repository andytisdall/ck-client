import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { connect } from 'react-redux';

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

import Header from './components/Header';
import Home from './components/Home';

import Admin from './components/admin/Admin';
import AdminHome from './components/admin/AdminHome';
import Create from './components/admin/Create';
import Edit from './components/admin/Edit';

import User from './components/user/User';
import UserHome from './components/user/UserHome';
import ChangePassword from './components/user/ChangePassword';
import ChangeUsername from './components/user/ChangeUsername';

import HomeChef from './components/homeChef/HomeChef';
import HomeChefHome from './components/homeChef/HomeChefHome';
import HomeChefOnboarding from './components/homeChef/HomeChefOnboarding';
import Resources from './components/homeChef/Resources';
import HomeChefDocuments from './components/homeChef/HomeChefDocuments';
import InterestForm from './components/homeChef/InterestForm';
import FormSent from './components/homeChef/FormSent';

const router = createBrowserRouter([
  { path: 'form', element: <InterestForm /> },
  { path: 'form-sent', element: <FormSent /> },
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
          { path: 'edit', element: <Edit /> },
        ],
      },
      {
        path: 'user',
        element: <User />,
        children: [
          { index: true, element: <UserHome /> },
          { path: 'change-password', element: <ChangePassword /> },
          { path: 'change-username', element: <ChangeUsername /> },
        ],
      },
      {
        path: 'home-chef',
        element: <HomeChef />,
        children: [
          { index: true, element: <HomeChefHome /> },
          { path: 'resources', element: <Resources /> },
          {
            path: 'onboarding',
            children: [
              { index: true, element: <HomeChefOnboarding /> },
              { path: 'documents', element: <HomeChefDocuments /> },
            ],
          },
        ],
      },
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
