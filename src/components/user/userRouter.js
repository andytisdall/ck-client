import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';
import React from 'react';

import renderWithFallback from '../reusable/loading/renderWithFallback';
import './User.css';

const ChangePassword = React.lazy(() => import('./ChangePassword'));
const ChangeUsername = React.lazy(() => import('./ChangeUsername'));
const UserHome = React.lazy(() => import('./UserHome'));

const User = ({ user }) => {
  if (!user) {
    return (
      <div className="main user">
        You must be signed in to access this page.
      </div>
    );
  }

  return (
    <div className="main user">
      <h1 className="page-header">User</h1>
      <div className="create-main">
        <Outlet />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.user };
};

const ConnectedUser = connect(mapStateToProps)(User);

const userRouter = {
  path: 'user',
  element: <ConnectedUser />,
  children: [
    { index: true, element: renderWithFallback(<UserHome />) },
    {
      path: 'change-password',
      element: renderWithFallback(<ChangePassword />),
    },
    {
      path: 'change-username',
      element: renderWithFallback(<ChangeUsername />),
    },
  ],
};

export default userRouter;
