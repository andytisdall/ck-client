import { utcToZonedTime } from "date-fns-tz";

import { useMemo } from "react";

import config from "../../config";
import {
  DriverJob,
  Job,
  VolunteerHours,
} from "../../../../state/apis/volunteerApi/types";
import { useGetHoursQuery } from "../../../../state/apis/volunteerApi/volunteerApi";
import ShiftListItem from "../../shiftList/ShiftListItem";
import DriverJobInfo from "./DriverJobInfo";

const ShiftList = ({
  contactId,
  job,
}: {
  contactId?: string;
  job: Job | DriverJob;
}) => {
  const { data: hours } = useGetHoursQuery({
    campaignId: job.campaign,
    contactId: contactId || "",
  });

  const { shifts } = job;
  const sortedShifts = useMemo(() => {
    return shifts
      .filter(
        (shift) =>
          utcToZonedTime(shift.startTime, "America/Los_Angeles") > new Date(),
      )
      .sort((a, b) => (new Date(a.startTime) > new Date(b.startTime) ? 1 : -1));
  }, [shifts]);
  const bookedShifts = !hours
    ? []
    : hours.filter((h) => h.status === "Confirmed").map((h) => h.shift);

  const driverCampaign = job.campaign === config.deliveryDrivers.id;

  return (
    <div className="volunteers-job">
      <h3>{job.name}</h3>
      <p>{job.description}</p>
      {driverCampaign && <DriverJobInfo job={job as DriverJob} />}
      <p></p>
      {sortedShifts.map((shift) => {
        const jobBooked = bookedShifts.includes(shift.id);
        let bookedHours: VolunteerHours | undefined;

        if (jobBooked && hours) {
          bookedHours = hours.find(
            (h) => h.shift === shift.id && h.status === "Confirmed",
          );
        }
        return (
          <ShiftListItem
            key={shift.id}
            shift={shift}
            contactId={contactId}
            bookedHoursId={bookedHours?.id}
            job={job}
          />
        );
      })}
    </div>
  );
};

export default ShiftList;
