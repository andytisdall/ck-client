import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useGetCampaignsQuery } from "../../../../state/apis/volunteerApi/campaigns";
import { RootState } from "../../../../state/store";
import { useGetUserQuery } from "../../../../state/apis/authApi";
import Loading from "../../../reusable/loading/Loading";
import KitchenCalendar from "./VolunteerCalendar";

const KitchenCalBase = () => {
  const { campaignId } = useParams();

  const { data: campaigns, isLoading } = useGetCampaignsQuery();
  const campaign = campaigns?.find((cam) => cam.id === campaignId);

  const volunteer = useSelector(
    (state: RootState) => state.volunteer.volunteer,
  );

  const { data: user, isLoading: userIsLoading } = useGetUserQuery();
  const contactId = volunteer?.id || user?.salesforceId;

  if (isLoading || userIsLoading) {
    return <Loading />;
  }

  if (!campaign) {
    return <div>Volunteer campaign data not found</div>;
  }

  return <KitchenCalendar contactId={contactId} campaign={campaign} />;
};

export default KitchenCalBase;
