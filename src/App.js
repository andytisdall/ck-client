import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Header from './components/Header';
import Home from './components/Home';

// text service
import AddPhone from './components/text/AddPhone';
import Text from './components/text/Text';
import TextMain from './components/text/TextMain';
import SendText from './components/text/SendText';
import TextSuccess from './components/text/TextSuccess';

// meal program onboarding
import Onboarding from './components/onboarding/Onboarding';
import OnboardingHome from './components/onboarding/OnboardingHome';
import Documents from './components/onboarding/Documents';
import FileSuccess from './components/onboarding/FileSuccess';

// docusign
import DocusignSign from './components/docusign/DocusignSign';
import DSLogin from './components/docusign/DSLogin';
import DocusignSuccess from './components/docusign/DocusignSuccess';

// admin
import Admin from './components/admin/Admin';
import AdminHome from './components/admin/AdminHome';
import Create from './components/admin/Create';
import Edit from './components/admin/Edit';

// user settings
import User from './components/user/User';
import UserHome from './components/user/UserHome';
import ChangePassword from './components/user/ChangePassword';
import ChangeUsername from './components/user/ChangeUsername';

// home chef
import HomeChef from './components/homeChef/HomeChef';
import HomeChefHome from './components/homeChef/HomeChefHome';
//home chef onboarding
import HomeChefOnboarding from './components/homeChef/onboarding/HomeChefOnboarding';
import HomeChefDocuments from './components/homeChef/onboarding/HomeChefDocuments';
import UploadFoodHandler from './components/homeChef/onboarding/UploadFoodHandler';
// home chef interest form
import InterestForm from './components/homeChef/generalInterest/InterestForm';
import FormSent from './components/homeChef/generalInterest/FormSent';
// home chef shift sign up
import ShiftSignup from './components/homeChef/shiftSignup/ShiftSignup';
import VolunteerJobsList from './components/homeChef/shiftSignup/VolunteerJobsList';
import Calendar from './components/homeChef/shiftSignup/Calendar';
import VJobSingle from './components/homeChef/shiftSignup/VJobSingle';
// home chef resources
import Resources from './components/homeChef/resources/Resources';
import ResourcesList from './components/homeChef/resources/ResourcesList';
import RecipeList from './components/homeChef/resources/recipes/RecipeList';
import Recipe from './components/homeChef/resources/recipes/Recipe';

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
              {
                path: 'sign',
                element: <DocusignSign accountType="restaurant" docCode="RC" />,
              },
              { path: 'login', element: <DSLogin accountType="restaurant" /> },
              {
                path: 'success',
                element: (
                  <DocusignSuccess accountType="restaurant" docCode="RC" />
                ),
              },
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
          {
            path: 'signup',
            element: <ShiftSignup />,
            children: [
              { path: 'list', element: <VolunteerJobsList /> },
              { path: 'fridge/:jobId', element: <VJobSingle /> },
              { path: 'calendar', element: <Calendar /> },
            ],
          },
          {
            path: 'resources',
            element: <Resources />,
            children: [
              { index: true, element: <ResourcesList /> },
              {
                path: 'recipes',
                children: [
                  { index: true, element: <RecipeList /> },
                  { path: ':recipeId', element: <Recipe /> },
                ],
              },
            ],
          },
          {
            path: 'onboarding',
            children: [
              { index: true, element: <HomeChefOnboarding /> },
              {
                path: 'documents',
                element: <HomeChefDocuments />,
              },
              {
                path: 'upload-food-handler',
                element: <UploadFoodHandler />,
              },
              { path: 'file-success', element: <FileSuccess /> },
              {
                path: 'docusign',
                children: [
                  {
                    path: 'sign',
                    element: (
                      <DocusignSign accountType="contact" docCode="HC" />
                    ),
                  },
                  {
                    path: 'login',
                    element: <DSLogin accountType="contact" />,
                  },
                  {
                    path: 'success',
                    element: (
                      <DocusignSuccess accountType="contact" docCode="HC" />
                    ),
                  },
                ],
              },
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
