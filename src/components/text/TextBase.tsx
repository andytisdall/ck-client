import { Outlet } from "react-router-dom";

import { useGetUserQuery } from "../../state/apis/authApi";
import Loading from "../reusable/loading/Loading";

const Text = () => {
  const { data: user, isLoading } = useGetUserQuery();

  const permitted = user?.admin;

  const renderTextBase = () => {
    if (isLoading) {
      return <Loading />;
    }
    return permitted ? (
      <Outlet />
    ) : (
      <h3>You must have the proper permissions to access this page.</h3>
    );
  };

  return (
    <div className="main text-home">
      <h1 className="page-header">Text Service</h1>
      {renderTextBase()}
    </div>
  );
};

export default Text;
