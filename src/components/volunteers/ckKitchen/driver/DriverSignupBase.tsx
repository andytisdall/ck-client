import { NavLink, useNavigate } from "react-router-dom";

import { useGetDriverQuery } from "../../../../state/apis/volunteerApi/driver";
import { navLink } from "../../../../utils/style";
import Loading from "../../../reusable/loading/Loading";
import { PropsWithChildren } from "react";

const DriverSignupBase = ({ children }: PropsWithChildren) => {
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
        <NavLink className={navLink} to="">
          List
        </NavLink>
        <NavLink className={navLink} to="cal">
          Calendar
        </NavLink>
      </div>

      {children}
    </div>
  );
};

export default DriverSignupBase;
