import { Outlet, Link } from "react-router-dom";
import { format } from "date-fns";

import { useGetUserQuery } from "../../state/apis/authApi";
import "../header/Header.css";
import "./volunteerCheckIn.css";
import Loading from "../reusable/loading/Loading";

const CheckInVolunteerBase = () => {
  const { data: user, isLoading } = useGetUserQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (!user?.admin) {
    return (
      <div className="main check-in">
        <h2>You do not have permission to use this page.</h2>
      </div>
    );
  }

  return (
    <div className="check-in">
      <div className="check-in-header">
        <div className="check-in-header-left">
          <img
            src="/images/logos/ck-logo.png"
            alt="ck logo"
            className="header-logo"
          />
          <h1>Volunteer Check-In</h1>
        </div>
        <div className="check-in-header-right">
          <Link to="/volunteer-check-in">
            <button className="cancel">Start Over</button>
          </Link>
          <strong>{format(new Date(), "eeee, M/d/yy")}</strong>
        </div>
      </div>
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
};

export default CheckInVolunteerBase;
