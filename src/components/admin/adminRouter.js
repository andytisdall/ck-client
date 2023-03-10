import { Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';

import './Admin.css';

import renderWithFallback from '../reusable/renderWithFallback';

const AdminHome = React.lazy(() => import('./AdminHome'));
const Create = React.lazy(() => import('./Create'));
const Edit = React.lazy(() => import('./Edit'));

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
    { path: 'create', element: renderWithFallback(<Create />) },
    { path: 'edit', element: renderWithFallback(<Edit />) },
  ],
};

export default adminRouter;
