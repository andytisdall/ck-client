import { utcToZonedTime } from "date-fns-tz";

import { useMemo } from "react";

import {
  Job,
  VolunteerCampaign,
  VolunteerHours,
} from "../../../state/apis/volunteerApi/types";
import { useGetHoursQuery } from "../../../state/apis/volunteerApi/volunteerApi";
import ShiftListItem from "./ShiftListItem";

const ShiftList = ({
  contactId,
  job,
  campaign,
}: {
  contactId?: string;
  job: Job;
  campaign: VolunteerCampaign;
}) => {
  const { data: hours } = useGetHoursQuery({
    campaignId: campaign.id,
    contactId: contactId || "",
  });

  const { shifts } = job;

  const sortedShifts = useMemo(() => {
    return shifts
      .filter(
        (shift) =>
          utcToZonedTime(shift.startTime, "America/Los_Angeles") > new Date()
      )
      .sort((a, b) => (new Date(a.startTime) > new Date(b.startTime) ? 1 : -1));
  }, [shifts]);

  const bookedJobs = !hours
    ? []
    : hours.filter((h) => h.status === "Confirmed").map((h) => h.shift);

  return (
    <div className="volunteers-job">
      <h3>{job.name}</h3>
      <p>{job.description}</p>
      {sortedShifts.map((shift) => {
        const jobBooked = bookedJobs.includes(shift.id);
        let bookedHours: VolunteerHours | undefined;

        if (jobBooked && hours) {
          bookedHours = hours.find(
            (h) => h.shift === shift.id && h.status === "Confirmed"
          );
        }
        return (
          <ShiftListItem
            key={shift.id}
            shift={shift}
            contactId={contactId}
            bookedHoursId={bookedHours?.id}
            campaign={campaign}
            job={job}
          />
        );
      })}
    </div>
  );
};

export default ShiftList;
