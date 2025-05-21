import { format, utcToZonedTime } from "date-fns-tz";
import { useParams, Outlet } from "react-router-dom";

import { useGetCampaignsQuery } from "../../../state/apis/volunteerApi/campaigns";
import Loading from "../../reusable/loading/Loading";

const EventSignupBase = () => {
  const { campaignId } = useParams();
  const { data: campaigns, isLoading } = useGetCampaignsQuery();

  const campaign = campaigns?.find((cam) => cam.id === campaignId);

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

  if (isLoading) {
    return <Loading />;
  }

  if (!campaign) {
    return (
      <h2>
        This event is no longer open to sign ups. Check the volunteers page for
        events in the future!
      </h2>
    );
  }

  return (
    <div>
      <h1 className="volunteers-main-header volunteers-kitchen-header">
        {campaign.name}
      </h1>
      <h3>{date}</h3>
      <p className="volunteers-home-section-body">{campaign.description}</p>
      <Outlet />
    </div>
  );
};

export default EventSignupBase;
