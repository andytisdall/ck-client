import { NavLink, Outlet, useParams, Link } from "react-router-dom";
import { utcToZonedTime, format } from "date-fns-tz";

import "./Volunteers.css";
import { navLink } from "../../utils/style";
import { useGetCampaignsQuery } from "../../state/apis/volunteerApi/campaigns";
import config from "./config";
import Loading from "../reusable/loading/Loading";

const CampaignBase = () => {
  const { campaignId } = useParams();
  const { data: campaigns, isLoading } = useGetCampaignsQuery();
  const campaign = campaigns?.find(
    (c) =>
      c.id === campaignId || c.id.substring(0, c.id.length - 3) === campaignId
  );

  const driver = campaign?.id === config.deliveryDrivers.id;
  const event = !!campaign?.startDate;

  const renderImages = () => {
    const campaignConfig = Object.values(config).find(
      ({ id }) => id === campaignId
    );
    if (campaignConfig) {
      return campaignConfig.images.map((img) => (
        <img
          key={img}
          src={`/images/volunteers/${img}`}
          alt="CK Volunteers"
          className="volunteers-kitchen-signup-photo volunteers-photo-frame"
        />
      ));
    }
  };

  const renderEditDriverInfoBtn = () => {
    if (driver) {
      return (
        <div className="volunteers-kitchen-signup-photos">
          <Link to="../../driver-onboarding">
            <button>Edit your information</button>
          </Link>
        </div>
      );
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!campaign) {
    if (event) {
      return (
        <h2>
          This event is no longer open to sign ups. Check the volunteers page
          for events in the future!
        </h2>
      );
    }
    return (
      <div>
        <p>Could not find the required info. Please start over.</p>
        <Link to="/volunteers">
          <button>Volunteers Home</button>
        </Link>
      </div>
    );
  }

  const renderEvent = () => {
    const startDate = campaign?.startDate
      ? format(
          utcToZonedTime(campaign.startDate, "America/Los_Angeles"),
          "eeee, MMMM do"
        )
      : "";

    const endDate = campaign?.endDate
      ? " - " +
        format(
          utcToZonedTime(campaign?.endDate, "America/Los_Angeles"),
          "eeee, MMMM do"
        )
      : "";

    const date = startDate + endDate;

    return (
      <div className="volunteers-body">
        <h3>{date}</h3>
        <p className="volunteers-home-section-body">{campaign.description}</p>
        <Outlet />
      </div>
    );
  };

  const renderOngoing = () => {
    return (
      <div className="volunteers-body">
        <div className="volunteers-shift-signup-links">
          <NavLink className={navLink} to={`/volunteers/signup/${campaignId}`}>
            List
          </NavLink>
          <NavLink className={navLink} to="cal">
            Calendar
          </NavLink>
        </div>
        {renderEditDriverInfoBtn()}

        <div className="volunteers-kitchen-signup-photos">{renderImages()}</div>
        <Outlet />
      </div>
    );
  };

  return (
    <div>
      <h1 className="volunteers-main-header volunteers-kitchen-header">
        {campaign.name}
      </h1>
      {event ? renderEvent() : renderOngoing()}
    </div>
  );
};

export default CampaignBase;
