import { Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';

import './Admin.css';

import renderWithFallback from '../reusable/renderWithFallback';

const AdminHome = React.lazy(() => import('./AdminHome'));
const Restaurant = React.lazy(() => import('./restaurant/Restaurant'));
const User = React.lazy(() => import('./user/User'));

const Admin = ({ user }) => {
  const renderForbidden = () => {
    return <h3>You must be an admin to access this page.</h3>;
  };
  return (
    <div className="main admin">
      <h1 className="page-header">Admin</h1>
      {user && user.admin && <Outlet />}
      {(!user || !user.admin) && renderForbidden()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const ConnectedAdmin = connect(mapStateToProps, null)(Admin);

const adminRouter = {
  path: 'admin',
  element: <ConnectedAdmin />,
  children: [
    {
      index: true,
      element: renderWithFallback(<AdminHome />),
    },
    { path: 'user', element: renderWithFallback(<User />) },
    { path: 'restaurant', element: renderWithFallback(<Restaurant />) },
  ],
};

export default adminRouter;
