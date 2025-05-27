import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import "./Driver.css";
import { useGetUserQuery } from "../../../../state/apis/authApi";
import Loading from "../../../reusable/loading/Loading";
import { useGetDriverQuery } from "../../../../state/apis/volunteerApi/driver";
import { useGetCampaignsQuery } from "../../../../state/apis/volunteerApi/campaigns";

const DriverBase = () => {
  const { campaignId } = useParams();

  const { data: campaigns, isLoading: campaignsAreLoading } =
    useGetCampaignsQuery();
  const { data: user, isLoading: userIsLoading } = useGetUserQuery();
  const { data: driver, isLoading: driverIsLoading } = useGetDriverQuery();

  const campaign = campaigns?.find((c) => c.id === campaignId);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      user &&
      driver &&
      campaign?.name === "Drivers" &&
      driver.driverStatus !== "Active"
    ) {
      navigate("driver-onboarding");
    }
  }, [driver]);

  if (campaign?.name !== "Drivers") {
    return <Outlet />;
  }

  if (userIsLoading || driverIsLoading || campaignsAreLoading) {
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
  return <Outlet />;
};

export default DriverBase;
