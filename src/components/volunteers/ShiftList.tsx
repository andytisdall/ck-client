import { utcToZonedTime } from "date-fns-tz";

import { useMemo } from "react";

import {
  Job,
  VolunteerCampaign,
  VolunteerHours,
} from "../../state/apis/volunteerApi/types";
import { useGetHoursQuery } from "../../state/apis/volunteerApi/volunteerApi";
import config from "./ckKitchen/driver/config";
import ShiftListItem from "./ShiftListItem";

const ShiftList = ({
  contactId,
  job,
  campaign,
}: {
  contactId: string;
  job: Job;
  campaign: VolunteerCampaign;
}) => {
  const { data: hours } = useGetHoursQuery({
    campaignId: campaign.id,
    contactId,
  });

  const { shifts } = job;

  const driver = campaign.name === config.driverCampaignName;

  const sortedShifts = useMemo(() => {
    return shifts
      .filter(
        (shift) =>
          utcToZonedTime(shift.startTime, "America/Los_Angeles") > new Date()
      )
      .sort((a, b) => (new Date(a.startTime) > new Date(b.startTime) ? 1 : -1));
  }, []);

  const bookedJobs = !hours
    ? []
    : hours.filter((h) => h.status === "Confirmed").map((h) => h.shift);

  if (!sortedShifts?.length) {
    return <></>;
  }

  return (
    <div className="volunteers-job">
      <h3>{job.name}</h3>
      <p>{job.description}</p>
      {sortedShifts
        .filter((sh) => sh.job === job.id)
        .map((shift) => {
          const jobBooked = bookedJobs.includes(shift.id);
          let bookedHours: VolunteerHours | undefined;

          if (jobBooked && hours) {
            bookedHours = hours.find(
              (h) => h.shift === shift.id && h.status === "Confirmed"
            );
          }
          return (
            <ShiftListItem
              shift={shift}
              contactId={contactId}
              bookedHoursId={bookedHours?.id}
              driver={driver}
            />
          );
        })}
    </div>
  );
};

export default ShiftList;
