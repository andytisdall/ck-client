import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useGetJobsQuery } from "../../state/apis/volunteerApi/jobs";
import { RootState } from "../../state/store";
import { useGetUserQuery } from "../../state/apis/authApi";
import Loading from "../reusable/loading/Loading";
import { useGetCampaignsQuery } from "../../state/apis/volunteerApi/campaigns";
import ShiftList from "./shiftList/ShiftList";
import { VolunteerCampaign } from "../../state/apis/volunteerApi/types";

const JobListBase = () => {
  const { campaignId } = useParams();

  const { data: campaigns } = useGetCampaignsQuery();
  const campaign = campaigns?.find((cam) => cam.id === campaignId);

  if (!campaign) {
    return <div>Could not find campaign.</div>;
  }

  return <JobList campaign={campaign} />;
};

const JobList = ({ campaign }: { campaign: VolunteerCampaign }) => {
  const { data: jobs, isLoading } = useGetJobsQuery({
    campaignId: campaign.id,
  });

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
      {jobs
        .filter((j) => j.active)
        .map((j) => {
          return (
            <ShiftList
              campaign={campaign}
              job={j}
              key={j.id}
              contactId={contactId}
            />
          );
        })}
    </div>
  );
};

export default JobListBase;
