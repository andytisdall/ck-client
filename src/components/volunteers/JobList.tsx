import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useGetJobsQuery } from "../../state/apis/volunteerApi/jobs";
import { RootState } from "../../state/store";
import { useGetUserQuery } from "../../state/apis/authApi";
import Loading from "../reusable/loading/Loading";
import { useGetCampaignsQuery } from "../../state/apis/volunteerApi/campaigns";
import ShiftList from "./ShiftList";

const JobList = ({ campaignIdProp }: { campaignIdProp?: string }) => {
  const { campaignId } = useParams();

  const { data: campaigns } = useGetCampaignsQuery();
  const { data: jobs, isLoading } = useGetJobsQuery({
    campaignId: campaignId || campaignIdProp || "",
  });

  const campaign = campaigns?.find((cam) =>
    campaignIdProp ? cam.id === campaignIdProp : cam.id === campaignId
  );

  const volunteer = useSelector(
    (state: RootState) => state.volunteer.volunteer
  );

  const { data: user } = useGetUserQuery();

  const contactId = volunteer?.id || user?.salesforceId;

  if (isLoading) {
    return <Loading />;
  }

  if (!jobs || !campaign || !contactId) {
    return <div>Could not find info.</div>;
  }

  return (
    <div>
      <h3 className="volunteers-signup-btns">Positions Available</h3>
      {jobs.map((j) => {
        return (
          <ShiftList
            campaignId={campaign.id}
            job={j}
            key={j.id}
            contactId={contactId}
            driver={campaign.name === "Drivers"}
          />
        );
      })}
    </div>
  );
};

export default JobList;
