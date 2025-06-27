import { Outlet } from "react-router-dom";
import { useGetUserQuery } from "../../state/apis/authApi";

import "./Doorfront.css";
import "../header/Header.css";

const DoorfrontBase = () => {
  const { data: user } = useGetUserQuery();

  if (!user?.admin) {
    return (
      <div className="main doorfront-base">
        <h2>You do not have permission to use this page.</h2>
      </div>
    );
  }

  return (
    <div className="main doorfront-base">
      <div className="check-in-header-container">
        {/* <div className="check-in-header">
          <img
            src="/images/logos/ck-logo.png"
            alt="ck logo"
            className="header-logo"
          /> */}
        <h1>CK Kitchen Doorfront</h1>
      </div>
      <Outlet />
    </div>
  );
};

export default DoorfrontBase;
