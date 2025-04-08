import { Outlet } from 'react-router-dom';

import { useGetUserQuery } from '../../state/apis/authApi';

const AdminBase = () => {
  const user = useGetUserQuery().data;
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

export default AdminBase;
