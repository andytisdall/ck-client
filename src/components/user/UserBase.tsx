import { Outlet } from 'react-router-dom';

import { useGetUserQuery } from '../../state/apis/authApi';

const User = () => {
  const user = useGetUserQuery().data;

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

export default User;
