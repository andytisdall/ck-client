import { useNavigate } from "react-router-dom";

import { useGetDriverQuery } from "../../../../state/apis/volunteerApi/driver";
import Loading from "../../../reusable/loading/Loading";
import Onboarding from "./Onboarding";

const DriverHome = () => {
  const { data: driver, isLoading } = useGetDriverQuery();

  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }
  if (driver?.driverStatus !== "Active") {
    return <Onboarding />;
  }

  return (
    <div>
      <h3>You can sign up for driver shifts!</h3>
      <button onClick={() => navigate("..")}>Continue</button>
    </div>
  );
};

export default DriverHome;
