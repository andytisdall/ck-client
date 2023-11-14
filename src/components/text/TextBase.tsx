import { Outlet } from 'react-router-dom';

import { useGetUserQuery } from '../../state/apis/authApi';

const Text = () => {
  const userQuery = useGetUserQuery();

  const renderSignIn = () => {
    return <h3>You must have the proper permissions to access this page.</h3>;
  };

  return (
    <div className="main text-home">
      <h1 className="page-header">Text Service</h1>
      {userQuery.data?.admin ? <Outlet /> : renderSignIn()}
    </div>
  );
};

export default Text;
