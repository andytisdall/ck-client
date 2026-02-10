import { useSelector } from "react-redux";
import { utcToZonedTime } from "date-fns-tz";
import { useMemo } from "react";

import { useGetJobsQuery } from "../../../../state/apis/volunteerApi/jobs";
import { RootState } from "../../../../state/store";
import { useGetUserQuery } from "../../../../state/apis/authApi";
import Loading from "../../../reusable/loading/Loading";
import ShiftList from "../../shiftList/ShiftList";
import { VolunteerCampaign } from "../../../../state/apis/volunteerApi/types";
import config from "../../config";

const JobList = ({ campaign }: { campaign: VolunteerCampaign }) => {
  const { data: jobs, isLoading } = useGetJobsQuery({
    campaignId: campaign.id,
  });

  const driver = campaign.id === config.deliveryDrivers.id;

  const volunteer = useSelector(
    (state: RootState) => state.volunteer.volunteer,
  );

  const { data: user } = useGetUserQuery();

  const contactId = volunteer?.id || user?.salesforceId;

  const visibleJobs = useMemo(() => {
    return jobs?.filter((j) => {
      const isTownFridgeJob = j.name.match(/town fridges/i) && !user?.admin;

      const filteredShifts = j.shifts.filter(
        (shift) =>
          utcToZonedTime(shift.startTime, "America/Los_Angeles") > new Date() &&
          (!driver ? true : j.carSizeRequired && !isTownFridgeJob),
      );

      return j.active && filteredShifts.length;
    });
  }, [driver, jobs, user]);

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
    <div>
      <div className="volunteers-email-display">
        <h3>Positions Available</h3>
      </div>
      {visibleJobs
        .filter((j) => {
          if (!user?.admin) {
            return !j.name.includes("Town Fridges");
          }
          return true;
        })
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

export default JobList;
