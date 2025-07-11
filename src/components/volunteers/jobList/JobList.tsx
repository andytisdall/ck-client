import { useSelector } from "react-redux";
import { utcToZonedTime } from "date-fns-tz";

import { useGetJobsQuery } from "../../../state/apis/volunteerApi/jobs";
import { RootState } from "../../../state/store";
import { useGetUserQuery } from "../../../state/apis/authApi";
import Loading from "../../reusable/loading/Loading";
import ShiftList from "../shiftList/ShiftList";
import { VolunteerCampaign } from "../../../state/apis/volunteerApi/types";
import config from "../driver/config";

const JobList = ({ campaign }: { campaign: VolunteerCampaign }) => {
  const { data: jobs, isLoading } = useGetJobsQuery({
    campaignId: campaign.id,
  });

  const driver = campaign.id === config.driverCampaignId;

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

  const visibleJobs = jobs.filter((j) => {
    const filteredShifts = j.shifts.filter(
      (shift) =>
        utcToZonedTime(shift.startTime, "America/Los_Angeles") > new Date() &&
        (!driver ? true : shift.carSizeRequired)
    );

    return j.active && filteredShifts.length;
  });

  if (!visibleJobs.length) {
    return <div>No upcoming shifts are available for sign up.</div>;
  }

  return (
    <div>
      <h3 className="volunteers-signup-btns">Positions Available</h3>
      {visibleJobs.map((j) => {
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

export default JobList;
