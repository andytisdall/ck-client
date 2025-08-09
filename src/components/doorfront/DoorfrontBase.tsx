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
    <main>
      <div className="main doorfront-base">
        <div className="check-in-header-container">
          <h1>CK Kitchen Doorfront</h1>
        </div>
        <Outlet />
      </div>
    </main>
  );
};

export default DoorfrontBase;
