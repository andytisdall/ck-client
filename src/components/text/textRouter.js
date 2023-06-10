import { Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';

import * as actions from '../../actions';
import renderWithFallback from '../reusable/renderWithFallback';
import './TextHome.css';

const Phone = React.lazy(() => import('./Phone'));
const TextHome = React.lazy(() => import('./TextHome'));
const SendText = React.lazy(() => import('./SendText'));
const TextSuccess = React.lazy(() => import('./TextSuccess'));
const Feedback = React.lazy(() => import('./Feedback'));
const CustomText = React.lazy(() => import('./CustomText'));

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
    { path: 'text-success', element: renderWithFallback(<TextSuccess />) },
    { path: 'feedback', element: renderWithFallback(<Feedback />) },
  ],
};

export default textRouter;
