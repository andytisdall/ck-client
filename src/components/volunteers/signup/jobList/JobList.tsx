import { useSelector } from "react-redux";
import { utcToZonedTime } from "date-fns-tz";
import { useMemo } from "react";

import { useGetJobsQuery } from "../../../../state/apis/volunteerApi/jobs";
import { RootState } from "../../../../state/store";
import { useGetUserQuery } from "../../../../state/apis/authApi";
import Loading from "../../../reusable/loading/Loading";
import JobItem from "./JobItem";
import { VolunteerCampaign } from "../../../../state/apis/volunteerApi/types";

const JobList = ({ campaign }: { campaign: VolunteerCampaign }) => {
  const { data: jobs, isLoading } = useGetJobsQuery({
    campaignId: campaign.id,
  });

  const volunteer = useSelector(
    (state: RootState) => state.volunteer.volunteer,
  );

  const { data: user } = useGetUserQuery();

  const contactId = volunteer?.id || user?.salesforceId;

  const visibleJobs = useMemo(() => {
    return jobs?.filter((j) => {
      const filteredShifts = j.shifts.filter(
        (shift) =>
          utcToZonedTime(shift.startTime, "America/Los_Angeles") > new Date(),
      );

      return j.active && filteredShifts.length;
    });
  }, [jobs]);

  if (isLoading) {
    return <Loading />;
  }

  if (!jobs) {
    return <div>Could not find info.</div>;
  }

  if (!visibleJobs?.length) {
    return <div>No upcoming shifts are available for sign up.</div>;
  }

  return (
    <div className="volunteers-job-list">
      {visibleJobs
        .filter((j) => {
          if (!user?.admin) {
            return !j.name.includes("Town Fridges");
          }
          return true;
        })
        .map((j) => {
          return <JobItem job={j} key={j.id} contactId={contactId} />;
        })}
    </div>
  );
};

export default JobList;
