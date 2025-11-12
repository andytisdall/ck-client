import { useSelector } from "react-redux";
import { utcToZonedTime } from "date-fns-tz";

import { useGetJobsQuery } from "../../../state/apis/volunteerApi/jobs";
import { RootState } from "../../../state/store";
import { useGetUserQuery } from "../../../state/apis/authApi";
import Loading from "../../reusable/loading/Loading";
import ShiftList from "../shiftList/ShiftList";
import { VolunteerCampaign } from "../../../state/apis/volunteerApi/types";
import config from "../config";
import { Link } from "react-router-dom";

const JobList = ({ campaign }: { campaign: VolunteerCampaign }) => {
  const { data: jobs, isLoading } = useGetJobsQuery({
    campaignId: campaign.id,
  });

  const driver = campaign.id === config.deliveryDrivers.id;

  const volunteer = useSelector(
    (state: RootState) => state.volunteer.volunteer
  );

  const { data: user } = useGetUserQuery();

  const contactId = volunteer?.id || user?.salesforceId;

  if (isLoading) {
    return <Loading />;
  }

  if (!jobs) {
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

  const renderSignIn = () => {
    if (!user && !volunteer) {
      return (
        <Link to={`../../../signin/${campaign.id}`}>
          <button className="volunteers-shift-space">
            Click here to see shifts you signed up for
          </button>
        </Link>
      );
    }
  };

  if (!visibleJobs.length) {
    return <div>No upcoming shifts are available for sign up.</div>;
  }

  return (
    <div>
      <div className="volunteers-email-display">
        <h3>Positions Available</h3>
        {renderSignIn()}
      </div>
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
      {driver && (
        <div className="volunteers-job">
          <h3>More driver opportunities coming soon</h3>
        </div>
      )}
    </div>
  );
};

export default JobList;
