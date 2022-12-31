import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';

import './User.css';

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

export default connect(mapStateToProps)(User);
