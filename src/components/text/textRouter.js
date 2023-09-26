import { Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import { lazy, useEffect } from 'react';

import * as actions from '../../actions';
import renderWithFallback from '../reusable/renderWithFallback';
import './TextHome.css';

const Phone = lazy(() => import('./phone/Phone'));
const TextHome = lazy(() => import('./TextHome'));
const SendText = lazy(() => import('./sendText/SendText'));
const TextSuccess = lazy(() => import('./sendText/TextSuccess'));
const Feedback = lazy(() => import('./feedback/Feedback'));
const CustomText = lazy(() => import('./customText/CustomText'));
const ScheduledText = lazy(() => import('./recurring/ScheduledText'));
const TextRecords = lazy(() => import('./textRecords/TextRecords'));
const RecurringConsole = lazy(() => import('./recurring/RecurringConsole'));

const Text = ({ user, getFridges }) => {
  useEffect(() => {
    getFridges();
  }, [getFridges]);
  const renderSignIn = () => {
    return <h3>You must have the proper permissions to access this page.</h3>;
  };

  return (
    <div className="main text-home">
      <h1 className="page-header">Text Service</h1>
      {user && (user.admin || user.textPermission) ? (
        <Outlet />
      ) : (
        renderSignIn()
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.user };
};

const ConnectedText = connect(mapStateToProps, actions)(Text);

const textRouter = {
  path: 'text',
  element: <ConnectedText />,
  children: [
    { index: true, element: renderWithFallback(<TextHome />) },
    {
      path: 'phone',
      element: renderWithFallback(<Phone />),
    },
    { path: 'send-text', element: renderWithFallback(<SendText />) },
    { path: 'send-custom-text', element: renderWithFallback(<CustomText />) },
    {
      path: 'send-scheduled-text',
      element: renderWithFallback(<ScheduledText />),
    },
    { path: 'text-success', element: renderWithFallback(<TextSuccess />) },
    { path: 'feedback', element: renderWithFallback(<Feedback />) },
    { path: 'text-records', element: renderWithFallback(<TextRecords />) },
    { path: 'recurring', element: renderWithFallback(<RecurringConsole />) },
  ],
};

export default textRouter;
