import { Link, Outlet } from "react-router-dom";

import "./Driver.css";
import { useGetUserQuery } from "../../../../state/apis/authApi";
import Loading from "../../../reusable/loading/Loading";
import DriverSignupBase from "./DriverSignupBase";

const DriverBase = () => {
  const { data: user, isLoading } = useGetUserQuery();

  const renderContent = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (!user) {
      return (
        <div>
          <h3>Please sign in to access this page.</h3>
          <p>
            To get a username,{" "}
            <Link to="/forms/volunteer">register as a volunteer here.</Link>
          </p>
        </div>
      );
    }

    return (
      <DriverSignupBase>
        <Outlet />
      </DriverSignupBase>
    );
  };

  return (
    <div>
      <h1>CK Driver Volunteers</h1>
      {renderContent()}
    </div>
  );
};
export default DriverBase;
