import { Link, Outlet, Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Volunteers.css";
import { RootState } from "../../state/store";
import { useGetUserQuery } from "../../state/apis/authApi";
import Loading from "../reusable/loading/Loading";
import { useGetDriverQuery } from "../../state/apis/volunteerApi/driver";
import config from "./config";
import GetVolunteer from "./getVolunteer/GetVolunteer";

const VolunteerSignInBase = () => {
  const { campaignId } = useParams();

  const { data: user, isLoading: userIsLoading } = useGetUserQuery();
  const { data: driver, isLoading: driverIsLoading } = useGetDriverQuery();

  const volunteer = useSelector(
    (state: RootState) => state.volunteer.volunteer
  );

  const driverCampaign = campaignId === config.deliveryDrivers.id;
  const invalidDriver =
    driverCampaign &&
    driver &&
    user &&
    (driver.driverStatus !== "Active" ||
      !driver.insuranceExpiration ||
      !driver.licenseExpiration ||
      new Date() > new Date(driver.insuranceExpiration) ||
      new Date() > new Date(driver.licenseExpiration));

  if (userIsLoading || driverIsLoading) {
    return <Loading />;
  }

  if (!driverCampaign) {
    if (!volunteer && !user) {
      return <GetVolunteer />;
    }
    return <Outlet />;
  }

  if (!user) {
    return (
      <div>
        <h3>Please sign in to access this page.</h3>
        <p>
          To get a username,{" "}
          <Link className="retro-link" to="/forms/volunteer">
            register as a volunteer here.
          </Link>
        </p>
      </div>
    );
  }

  if (invalidDriver) {
    return <Navigate replace to="../driver-onboarding" />;
  }

  return <Outlet />;
};

export default VolunteerSignInBase;
