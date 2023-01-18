import { Outlet } from 'react-router-dom';
import { connect } from 'react-redux';

import AdminHome from './AdminHome';
import Create from './Create';
import Edit from './Edit';
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

const ConnectedAdmin = connect(mapStateToProps, null)(Admin);

const adminRouter = {
  path: 'admin',
  element: <ConnectedAdmin />,
  children: [
    { index: true, element: <AdminHome /> },
    { path: 'create', element: <Create /> },
    { path: 'edit', element: <Edit /> },
  ],
};

export default adminRouter;
