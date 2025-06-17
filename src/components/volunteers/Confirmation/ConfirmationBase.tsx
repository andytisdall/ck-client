import { useParams } from "react-router-dom";

import Confirmation from "./Confirmation";
import Loading from "../../reusable/loading/Loading";
import { useGetHourQuery } from "../../../state/apis/volunteerApi/volunteerApi";
import { useGetCampaignsQuery } from "../../../state/apis/volunteerApi/campaigns";

const ConfirmationBase = () => {
  const { hoursId } = useParams();

  const { data: campaigns, isLoading: campaignsIsLoading } =
    useGetCampaignsQuery();

  const { data: hour, isLoading: hourIsLoading } = useGetHourQuery(
    hoursId || ""
  );

  const isLoading = campaignsIsLoading || hourIsLoading;

  const campaignId = hour?.campaign;
  const campaign = campaignId
    ? campaigns?.find((cam) => cam.id.startsWith(campaignId))
    : undefined;

  if (isLoading) {
    return <Loading />;
  }

  if (!campaign || !hour) {
    return <div>Not Found.</div>;
  }

  return <Confirmation campaign={campaign} hour={hour} />;
};

export default ConfirmationBase;
