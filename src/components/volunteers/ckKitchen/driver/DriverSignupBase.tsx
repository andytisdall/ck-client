import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { useGetDriverQuery } from "../../../../state/apis/volunteerApi/driver";
import { navLink } from "../../../../utils/style";
import Loading from "../../../reusable/loading/Loading";

const DriverSignupBase = () => {
  const { data: driver, isLoading } = useGetDriverQuery();

  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  if (driver?.driverStatus !== "Active") {
    navigate("onboarding");
  }

  return (
    <div className="volunteers-body">
      <div className="volunteers-shift-signup-links">
        <NavLink className={navLink} to="/volunteers/driver/signup/">
          List
        </NavLink>
        <NavLink className={navLink} to="cal">
          Calendar
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default DriverSignupBase;
