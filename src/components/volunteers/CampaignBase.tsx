import { NavLink, Outlet, useParams, Link, Navigate } from "react-router-dom";
import { utcToZonedTime, format } from "date-fns-tz";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../state/store";
import { useGetUserQuery } from "../../state/apis/authApi";
import "./Volunteers.css";
import { navLink } from "../../utils/style";
import { useGetCampaignsQuery } from "../../state/apis/volunteerApi/campaigns";
import config from "./config";
import Loading from "../reusable/loading/Loading";
import GetVolunteer from "./getVolunteer/GetVolunteer";

const CampaignBase = () => {
  const { campaignId } = useParams();
  const [getContact, setGetContact] = useState(false);

  const { data: campaigns, isLoading } = useGetCampaignsQuery();
  const campaign = campaigns?.find((c) => c.id === campaignId);

  const driver = campaign?.id === config.deliveryDrivers.id;
  const event = !!campaign?.startDate;

  const volunteer = useSelector(
    (state: RootState) => state.volunteer.volunteer
  );

  const { data: user } = useGetUserQuery();

  const contactId = volunteer?.id || user?.salesforceId;

  useEffect(() => {
    if (contactId) {
      setGetContact(false);
    }
  }, [contactId]);

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
          className={`volunteers-kitchen-signup-photo volunteers-photo-frame ${event ? "volunteers-event-photo" : ""}`}
        />
      ));
    }
  };

  const renderEditDriverInfoBtn = () => {
    return (
      <div className="volunteers-driver-info-btn">
        <Link to="../../driver-onboarding">
          <button>Edit your information</button>
        </Link>
      </div>
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!campaign) {
    const shortenedCampaign = campaigns?.find(
      (c) => c.id.substring(0, c.id.length - 3) === campaignId
    );
    if (shortenedCampaign) {
      return <Navigate replace to={`../${shortenedCampaign.id}`} />;
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
      </div>
    );
  };

  const renderSignIn = () => {
    if (!user && !volunteer) {
      return (
        <div className="volunteers-driver-info-btn">
          <button onClick={() => setGetContact(true)}>
            See Shifts You Signed Up For
          </button>
        </div>
      );
    }
  };

  const renderOngoing = () => {
    return (
      <div className="volunteers-body">
        <div className="volunteers-shift-signup-links">
          <NavLink className={navLink} to="list">
            List
          </NavLink>
          <NavLink className={navLink} to="cal">
            Calendar
          </NavLink>
        </div>
        {driver ? renderEditDriverInfoBtn() : renderSignIn()}
      </div>
    );
  };

  if (getContact) {
    return <GetVolunteer />;
  }

  return (
    <div>
      <h1 className="volunteers-main-header volunteers-kitchen-header">
        {campaign.name}
      </h1>
      <div className="volunteers-kitchen-signup-photos">{renderImages()}</div>

      {event ? renderEvent() : renderOngoing()}
      <Outlet />
    </div>
  );
};

export default CampaignBase;
