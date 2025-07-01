import { useParams } from "react-router-dom";
import { useGetCampaignsQuery } from "../../../state/apis/volunteerApi/campaigns";

import Loading from "../../reusable/loading/Loading";
import JobList from "./JobList";

const JobListBase = () => {
  const { campaignId } = useParams();

  const { data: campaigns, isLoading } = useGetCampaignsQuery();
  const campaign = campaigns?.find((cam) => cam.id === campaignId);

  if (isLoading) {
    return <Loading />;
  }

  if (!campaign) {
    return <div>Could not find campaign.</div>;
  }

  return <JobList campaign={campaign} />;
};

export default JobListBase;
