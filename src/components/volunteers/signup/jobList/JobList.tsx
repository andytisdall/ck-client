import { utcToZonedTime } from "date-fns-tz";
import { useMemo } from "react";

import { useGetJobsQuery } from "../../../../state/apis/volunteerApi/jobs";
import Loading from "../../../reusable/loading/Loading";
import JobItem from "./JobItem";
import { VolunteerCampaign } from "@community-kitchens/apiinterfaces";

const JobList = ({ campaign }: { campaign: VolunteerCampaign }) => {
  const { data: jobs, isLoading } = useGetJobsQuery({
    campaignId: campaign.id,
  });

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
      {visibleJobs.map((j) => {
        return <JobItem job={j} key={j.id} />;
      })}
    </div>
  );
};

export default JobList;
