import { Outlet } from 'react-router-dom';
import { connect } from 'react-redux';

import './Admin.css';

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

export default connect(mapStateToProps, null)(Admin);
