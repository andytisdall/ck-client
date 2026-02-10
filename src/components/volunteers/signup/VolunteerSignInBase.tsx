import { Link, Outlet, Navigate, useParams } from "react-router-dom";

import "../Volunteers.css";
import { useGetUserQuery } from "../../../state/apis/authApi";
import Loading from "../../reusable/loading/Loading";
import { useGetDriverQuery } from "../../../state/apis/volunteerApi/driver";
import config from "../config";

const VolunteerSignInBase = () => {
  const { campaignId } = useParams();

  const { data: user, isLoading: userIsLoading } = useGetUserQuery();
  const { data: driver, isLoading: driverIsLoading } = useGetDriverQuery();

  const driverCampaign = campaignId === config.deliveryDrivers.id;

  if (userIsLoading || driverIsLoading) {
    return <Loading />;
  }

  if (!driverCampaign) {
    return <Outlet />;
  }

  // below is only for driver

  if (!user) {
    return (
      <div>
        <h3>Please sign in to access this page.</h3>
        <p>
          To get sign in and become a Delivery Driver volunteer,{" "}
          <Link className="retro-link" to="/forms/volunteer">
            register as a volunteer here.
          </Link>
        </p>
      </div>
    );
  }

  const invalidDriver =
    driverCampaign &&
    driver &&
    user &&
    (driver.driverStatus !== "Active" ||
      !driver.insuranceExpiration ||
      !driver.licenseExpiration ||
      new Date() > new Date(driver.insuranceExpiration) ||
      new Date() > new Date(driver.licenseExpiration));
  if (invalidDriver) {
    return <Navigate replace to="../driver-onboarding" />;
  }

  return <Outlet />;
};

export default VolunteerSignInBase;
