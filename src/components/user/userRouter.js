import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';

import './User.css';
import ChangePassword from './ChangePassword';
import ChangeUsername from './ChangeUsername';
import UserHome from './UserHome';

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
    { index: true, element: <UserHome /> },
    { path: 'change-password', element: <ChangePassword /> },
    { path: 'change-username', element: <ChangeUsername /> },
  ],
};

export default userRouter;
